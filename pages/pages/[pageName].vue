<template>
    <div class="page content-page">
        <Head>
            <Title>{{ seo?.title }}</Title>
            <Meta name="description" :content="seo?.description" />
        </Head>

        <Breadcrumbs 
            :list="[{title: page?.title}]"
        />

        <PageTitle :title="page?.title"/>
        
        <div class="content-wrapper">
            <ParsedHTML :html="page?.content"/>
        </div>
    </div>
</template>

<script setup>
    const pageName = computed(()=>R().params.pageName)

    const page = computed(()=>useContentPages()?.page(pageName.value, 'name'))

    if(!page.value)throw Error404(useRequestEvent());

    const seo = computed(()=>{
        switch(pageName.value) {
            case 'dostavka-i-oplata': return {title: 'Доставка и оплата | ЗКМ Гидро', description: 'Доставка в любой регион РФ транспортной компанией. Удобные варианты оплаты.'};
        }
    })
    
</script>

<style lang="scss" scoped>
    .content-page{
        padding-bottom: 8rem;

        h1{
            margin-bottom: 3.2rem;
        }

        .parsed-html{
            max-width: 94rem;
        }
    }
</style>