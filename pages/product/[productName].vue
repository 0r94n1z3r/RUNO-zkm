<template>
    <div class="page product-page">
        <Head v-if="info?.id">
            <Title>{{ `${info?.title} – купить в Москве по низким ценам | ЗКМ Гидро` }}</Title>
            <Meta name="description" :content="`${info?.title} в наличии в Москве! ✔ Гарантия качества ✔ Доставка по всей России ✔ Удобная оплата.`" />
        </Head>

        <Breadcrumbs
            :list="breadcrumbs"
        />

        <PP-Preloader v-if="isClient && loading"/>

        <template v-else-if="info?.id">
            <PageTitle :title="info?.title"/>

            <div class="product-content content-wrapper" v-if="info">
                <div class="product-content__container">
                    <PP-Hero :={info} />
                    <PP-Aside class="mob-visible" :={info} />
                    <PP-Description :={info} />
                    <PP-GenericDescription :={info} />
                    <PP-Attributes :={info} />
                </div>
                <div class="product-content__aside desk-visible">
                    <PP-Aside :={info} />
                </div>
            </div>

            <PP-Recommendations :={info} />

            <ProdsHistory />
        </template>
    </div>
</template>

<script setup>
    definePageMeta({
        nav: 'catalog'
    })

    const productName = computed(()=>R().params.productName);
    
    const event = useRequestEvent();

    const loading = ref();

    const isClient = computed(()=>process.client)

    const info = ref({});

    const init = async ()=>{
        loading.value = true;

        (
            {data: {value: info.value}} = await useAPI(
                `/products/product/${productName.value}`,
                {server: process.server}
            )
        );

        loading.value = false;

        if(!info.value?.id) throw Error404(event);
    }

    if(process.server){
        await init();
    }else{
        init();
    }

    watch(
        productName, 
        (n,o)=>{if(n){console.log(n,o);init()}},
    )
        

    const breadcrumbs = computed(()=>[
        {title: 'Каталог товаров', href: '/catalog'},
        ...(
            useCategories().list.length?
                useCategories().breadcrumbs(info.value?.category_id)?.map(e => ({title: e?.title, href: `/catalog/${e?.name}`}))
                :[{loading: true}]
        ),
        {title: info.value?.title, loading: loading.value}
    ])

    useProdsHistory();

    watch(
        productName, 
        (n)=>{
            if(n)useProdsHistory().push(info.value);
        }, 
        {immediate: true}
    )
</script>

<style lang="scss" scoped>
    .page :deep(.page-title){
        --mb: 3.2rem;
    }

    .product-content{
        display: flex;
        gap: 3rem;     
        align-items: start;

        &__container{
            width: 100%;
            @include flex-col;
            gap: 4rem;

        }

        &__aside{
            width: 27rem;
            flex-shrink: 0;
            position: sticky;
            top: calc(var(--header-height) + 3rem);
        }
    }

    .product-content,
    .pp-recommendations{
        margin-bottom: 10rem;
    }

    @media (max-width: 800px) {
        .page-title{
            display: none;
        }

        .product-content{
            .pp-hero{
                margin-bottom: -2.4rem;
            }
        }

        .product-content,
        .pp-recommendations{
            margin-bottom: 6rem;
        }
    }

    @include mob-display(1100px); 
</style>