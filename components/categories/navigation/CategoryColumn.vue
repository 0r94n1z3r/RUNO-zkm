<template>
    <div class="category-column">
        <template v-if="useCategories().initLoading">
            <Placeholder 
                v-for="i in 7"
                type="log"
                style="--width:100%;--height: 2.4rem;padding: .8rem;"
            />
        </template>
        <template v-else>
            <!-- titles -->
                <div 
                    v-if="k == 0"
                    class="
                        category-column-item
                        category-column-item--main-title
                        mob-visible
                    "
                >
                    <h6>КАТАЛОГ</h6>
                </div>
                <div 
                    v-if="k != 0"
                    class="
                        category-column-item
                        category-column-item--main-title
                        mob-visible
                    "
                    @click="emit('start')"
                >   
                    <div class="category-column-item__arrow">
                        <Icon name="chevron-left" :size="48"/>
                    </div>
                    <h6>Назад в Каталог</h6>
                </div>
                <div 
                    v-if="k != 0"
                    class="
                        category-column-item
                        category-column-item--back-title 
                        mob-visible
                    "
                    @click="()=>{if(k>1)emit('prev')}"
                >
                    <div v-if="k>1" class="category-column-item__arrow">
                        <Icon name="chevron-left" :size="48"/>
                    </div>
                    <SVG-File
                        v-if="k==1 && i?.icon_url"
                        class="category-column-item__image"
                        :src="i?.icon_url"
                    />
                    <h6>{{ useCategories().category(id).title?.toUpperCase() }}</h6>
                </div>
                <div v-if="title" class="category-column-item category-column-item--title">
                    <h6>{{ title.toUpperCase() }}</h6>
                </div>

            <NuxtLink 
                class="category-column-item" 
                :class="{'category-column-item--active': ids.includes(i.id)}" 
                
                v-for="i in list"
                :to="`/catalog/${i.name}`"
                
                @click="linkClickHandler"
                @mouseenter="arrowHoverHandler(i.id)" 
            >
                <SVG-File
                    v-if="k==0 && i?.icon_url"
                    class="category-column-item__image"
                    :src="i?.icon_url"
                />

                <div class="category-column-item__title-wrapper">
                    <p class="category-column-item__title">{{ i.title }}</p>
                    <!-- <p class="category-column-item__num" v-if="i.count">{{ i.count }}</p> -->
                </div>
                <div 
                    v-if="useCategories().hasSubCategories(i.id)"
                    class="category-column-item__arrow" 
                    @click.stop.prevent="arrowClickHandler(i.id)"
                >
                    <Icon name="chevron-right" :size="48"/>
                </div>
            </NuxtLink>
        </template>
    </div>
</template>

<script setup>
    const props = defineProps({
        id: null,
        ids: Array,
        k: Number,
        title: String
    })
    
    const emit = defineEmits(['next', 'prev', 'start']);
    
    const list = computed(()=>useCategories().subCategories(props.id));
    
    const {y: scrollY} = useWindowScroll();
    const {width: wWidth} = useWindowSize();

    const arrowHoverHandler = (id)=>{
        if(wWidth.value <= 1100)return;
        emit('next', id);
    }

    const arrowClickHandler = (id)=>{
        if(wWidth.value > 1100)return;
        scrollY.value = 0;
        emit('next', id);
    }

    const linkClickHandler = ()=>{
        useCategories().called = false;
    }
</script>

<style lang="scss" scoped>
    .category-column{
        @include flex-col;
        // gap: 1.2rem;
        height: 100%;
        overflow-y: auto;
        overscroll-behavior: contain;
        background: var(--white);
        box-shadow: 0 .4rem 1rem 0 rgba(160, 158, 177, 0.25);
    }

    .category-column-item{
        cursor: pointer;
        padding: 1.2rem .8rem 1.2rem 1.6rem;
        display: flex;
        align-items: center;
        gap: .8rem;
        min-width: 0;
        min-height: 4.8rem;

        transition: .3s;

        --hov: var(--orange-100);

        &--active{
            color: var(--orange-100);
            // background: var(--orange-40);
        }

        &--title{
            background: var(--black-5);
        }

        &--main-title{
            background: var(--orange-100);
            color: var(--white);
            --hov: var(--white);
        }

        &--back-title{
            background: var(--black-5);
            color: var(--orange-100);
        }

        @media (hover: hover){
            &:not(&--title):hover{
                color: var(--hov);
            }
        }

        &__image{
            width: 2rem;
            height: 2rem;
            object-fit: contain;
            display: block;
            flex-shrink: 0;
        }

        &__title-wrapper{
            display: flex;
            width: 100%;
            min-width: 0;
            gap: .8rem;
            // height: 3rem;
            align-items: center
        }

        // &__title{
        //     @include text-overflow;
        // }

        &__num{
            color: var(--black-60);
            white-space: nowrap;
            align-self: flex-start;
        }

        &__arrow{
            // color: var(--black-60);
            @include virtual-area(.8rem);

            .icon{
                --icon-size: 2rem;
            }
        }
    }

    @include mob-display($mobile);

    @media (max-width: $mobile) {
        .category-column{
            height: max-content;
            border-radius: 0 0 .8rem .8rem;
        }
    }

</style>