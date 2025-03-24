<template>
    <div class="page">
        <Head>
            <Title>Купить гидравлику от производителя | Полный каталог гидравлического оборудования</Title>
            <Meta name="description" content="Каталог гидрооборудования: широкий выбор гидравлической техники и комплектующих с гарантией качества. Доставка по Москве и всей России." />
        </Head>

        <Breadcrumbs
            :list="[{title: 'Каталог товаров'}]"
        />

        <PageTitle title="Каталог товаров"/>

        <CompilationCategories id="1"/>
        <CompilationCategories id="115"/>

        <ProdsHistory />

        <Partners/>
    </div>
</template>

<script setup>
    definePageMeta({
        nav: 'catalog'
    })
</script>

<style lang="scss" scoped>

</style>