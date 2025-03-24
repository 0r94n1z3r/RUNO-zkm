<template>
    <div class="page catalog catalog-page">
        <Breadcrumbs 
            class="breadcrumbs"
            v-if="breadcrumbs"
            :="breadcrumbs"
        />

        <PageTitle :title="title"/>

        <slot :total="R_total" />

        <div class="catalog__content-wr content-wrapper" v-if="showContent">
            <div 
                class="catalog-filters-wr"
                :class="{'catalog-filters-wr--called': useFilters().called}"
            >
                <div 
                    class="catalog-filters-wr__wrapper"
                    @mousedown.self="useFilters().called = false"
                >
                    <div class="catalog-filters-wr__container">
                        <div class="catalog-filters-wr__title">
                            <h5>Фильтры</h5>
                            <Close @click="useFilters().called = false"/>
                        </div>
                        <slot name="filters"/>
                        <Button 
                            class="catalog-filters-wr__button"
                            @mousedown="useFilters().called = false"
                        >
                            Показать
                        </Button>
                    </div>
                </div>
            </div>
            <div class="catalog__content">
                <!-- <CatalogTags class="catalog-tags" :tags="tags"/> -->
                <CatalogSwitches
                    class="catalog-switches"
                    v-model:view="view"
                    :total="R_total"
                />
                <p class="catalog-switches-total mob-visible">
                    {{ pluralizeWord(['Найден', 'Найдено', 'Найдено'], R_total) }}
                    <span>{{ R_total }}</span>
                    {{pluralizeWord(['товар', 'товара', 'товаров'], R_total)}}
                </p>
                <CatalogList
                    class="catalog-list" 
                    :="{
                        view,
                        list: R_list,
                        loading: R_loading,
                        totalPages,
                        hasPagination,
                        hasFilters
                    }"
                    v-model:page="page"
                    v-model:pagPause="pagPause"
                />
                <ParsedHTML v-if="description" :html="description"/>
            </div>
        </div>

        <ProdsHistory/>
    </div>
</template>

<script setup>
    const props = defineProps({
        breadcrumbs: Object,
        title: String,
        description: String,

        showContent: {
            type: Boolean,
            default: true
        },

        list: Array,
        total: Number,
        loading: {
            type: Boolean,
            default: null
        },

        hasPagination: {
            type: Boolean,
            default: true
        },

        endpoint: String,
        defaultFilters: {
            type: Object,
            default: {}
        },

        limit: {
            type: Number,
            default: 12
        },

        hasFilters: Boolean,
    })

    const emit = defineEmits(['empty']);

//defaults
    const R_list = computed(()=>props.list ?? F_list.value);
    const R_loading = computed(()=>props.loading ?? F_loading.value);
    const R_total = computed(()=>props.total ?? F_total.value);

//view
    const view = ref('normal');
    watch(
        view, 
        (n,o)=>{
            if(n == o || !sessionStorage)return;
            sessionStorage.ZKM_view = view.value;
        }
    );
    
    const mounted = ref();

    onMounted(()=>{
        if(sessionStorage?.ZKM_view)view.value = sessionStorage.ZKM_view;
        mounted.value = true;
    })

//fetch
    const F_list = ref([]);

    const page = ref([1]);
    const pagPause = ref(false);

    const F_loading = ref(false);

    //total
        const F_total = ref(0);
        
        const totalPages = computed(()=>
            Math.ceil(R_total.value / props.limit)
        );

    const updateList = async (
        options={}
        /*{
            soft: Boolean // при пагинации
        }*/
    )=>{

        if(props.list || !props.endpoint)return;

        if(!options.soft){
            F_list.value = [];
        }
        
        F_loading.value = true;

        try{
            let start, end;

            start = (page.value[page.value.length-1] - 1) * props.limit;
            end = start + props.limit - 1;
               
            console.log(props.endpoint);

            const {
                data: {value: fetched},
                error
            } = await useAPI(
                props.endpoint,
                {
                    server: process.server,
                    query: {
                        filter: {
                            ...props.defaultFilters,
                            ...useFilters().filter
                        },
                        props: useFilters().props,
                        sortBy: useFilters().sortByDisplay,
                        has_discount: useFilters().hasDiscount,

                        q: R().name == 'Search' ? useSearch().searchText : '',

                        start,
                        end
                    },
                },
                {abortKey: 'updateList'}
            );

            //error handler
                if(error?.value){
                    if(error.value.statusCode < 500){
                        throw Error404(event, error?.value?.message);
                    }else if(error.value.cause?.name == 'AbortError'){
                        return;
                    }else{
                        throw new Error(error?.value?.data?.message);
                    }
                }

            pagPause.value = false;

            if(options.soft){
                F_list.value.push(...fetched?.products);
            }else{
                F_list.value = fetched?.products;

                F_total.value = fetched?.total || 0;
                useWindowScroll().y.value = 0;

                if(!F_list.value.length)emit('empty');
            }

            // console.log(fetched);
            F_loading.value = false;

        }catch (error) {
            // notdone
            console.error("Ошибка при получении информации о продукте:", error);
            F_loading.value = false;
        }
    }

    if(process.server){
        await updateList();
    }else{
        updateList();
    }
    
    const forceUpdate = ()=>{
        if(page.value[page.value.length -1] == 1){
            updateList()
        }else{
            page.value = [1];
        }
    }

    watch(()=>[...page.value], (n,o)=>{
        if(n.toString() == o.toString())return;
        updateList({soft: n.length != 1})
    });

    let filtersDebounce = null;
    watch(
        // () => [useFilters().props, useFilters().filter, useFilters().sortBy, useFilters().hasDiscount],
        () => useFilters().keys.map(k => useFilters()[k]),
        (n, o) => {
            if (JSON.stringify(n) == JSON.stringify(o)) return;
            F_loading.value = true;
            if (filtersDebounce) clearTimeout(filtersDebounce); // таймер задержки
            filtersDebounce = setTimeout(forceUpdate, 500);
        },
        { deep: true }
    );

    //show-content
        watch(()=>props.showContent, (n)=>{if(!n)F_list.value = []})

    //filters
        onUnmounted(()=>{
            useFilters().called = false;
            F_list.value = [];
            F_loading.value = true;
        })






//expose
    defineExpose({
        forceUpdate
    });
    
    
</script>

<style lang="scss" scoped>
    .catalog{

        .page-title{
            min-height: 1.5em;
            --mb: 2.4rem;
        }

        &__title-placeholder{
            --width: 100%;
            max-width: 40rem;
            margin-bottom: 4.6rem;
        }

        &__content-wr{
            display: grid;
            grid-template-columns: 27rem 3fr;
            // grid-template-columns: 3fr 1fr; //tmp
            gap: 3rem;
            align-items: flex-start;
            margin-bottom: 10rem;
        }

        &__content{
            height: 100%;
            min-width: 0;
        }

        &__found{
            padding: .8rem;
            padding-top: 0;
        }

        &__found-placeholder{
            margin: 1.1rem 0;
        }

        @media (max-width: $navigation-mobile) {
            &__content-wr{
                display: block;
            }
        }

        @media (max-width: $mobile) {
            padding-top: 2.4rem;

            .breadcrumbs {
                margin-bottom: 1.6rem;
            }
        }

    }

    .catalog-filters-wr{
        min-width: 0;
        position: sticky;
        top: var(--header-height);
        left: 0;
        padding-top: 3.2rem;
        margin-top: -3.2rem;

        &__container{
            overflow-y: auto;
            max-height: calc(100vh - var(--header-height) * 2);
            overscroll-behavior: contain;
            @include virtual-area(1.8rem);

            @media (hover: hover) {
                &:not(:hover){
                    &::-webkit-scrollbar-thumb{
                        background: transparent;
                    }
                }
            }
        }

        &__title{
            @include flex-jtf;
            align-items: center;
            margin-bottom: 2rem;
        }

        &__button{
            width: 100%;
            position: sticky;
            bottom: 0;
            left: 0;
        }

        @media (min-width: calc($navigation-mobile + 1px)) {
            :deep(.catalog-filters-wr__title),
            :deep(.catalog-filters-wr__button)
            {
                display: none;
            }
        }

        @media (max-width: $navigation-mobile) {
            position: fixed;
            z-index: 10;
            top: var(--header-height);
            left: 0;
            bottom: unset;
            height: 100%;
            width: 100%;
            transition: 0s;
            transition-delay: .0s;

            padding-top: 0;
            margin-top: 0;

            --h: calc(
                100 * var(--vh) - 
                var(--header-height, 11.3rem) - 
                var(--mobile-navigation-height, 5.8rem) +
                1.2rem
            );

            height: var(--h);


            &__container{
                @include virtual-area(0);
                max-height: calc(var(--h) - 3.4rem);
            }
            
            &__wrapper{
                width: 100%;
                min-height: 100%;
                background: var(--black-transparent);
                transition: .3s;
                padding-bottom: 76rem;
            }
            
            &__container{
                max-width: 38rem;
                background: var(--white);
                padding: 1.6rem;
                transition: .3s;
                border-radius: 0 0 .8rem 0;
            }
            
            &:not(&--called){
                transition-delay: .3s;
                height: 0;
                overflow: hidden;
                background-color: transparent;
                pointer-events: none;
                
                .catalog-filters-wr{
                    &__container{
                        @include hidden-hor(-1rem);
                    }

                    &__wrapper{
                        background: transparent;
                    }
                }
            }
        }

        @media (max-width: $navigation-mobile) {
            &__container{
                border-radius: 0 0 .8rem .8rem;
            }
        }

        @media (max-width: $mobile) {
            &__wrapper{
                padding-bottom: 7.8rem;
            }

            &__container{
                overflow-y: scroll;
            }
        }
    }

    h1{
        margin-bottom: 3.2rem;
    }

    .sub-categories{
        margin-bottom: 6rem;
    }    

    .catalog-tags{
        margin-bottom: 2.4rem;
    }

    .catalog-switches-total{
        margin-top: -1.2rem;
        margin-bottom: 1.2rem;

        @include font-14;
        color: var(--black-40);
        
        span{
            @include font-h7
        }
    }

    @include mob-display($navigation-mobile);

    :deep(.catalog-switches){
        margin-bottom: 1.2rem!important;
    }

    :deep(.catalog-list){
        margin-bottom: 6rem;
    }

</style>