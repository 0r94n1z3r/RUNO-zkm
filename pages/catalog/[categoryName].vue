<template>
    <Head>
        <Title>{{ `${currentCategory?.title} – купить в Москве: каталог и цены` }}</Title>
        <Meta name="description" :content="`Купить ${currentCategory?.title} в интернет-магазине ЗКМ Гидро в Москве по низким ценам.  ✔ Большой каталог.✔ Гарантия качества. ✔ Доставка по всей России. ✔ Удобная оплата.`" />
    </Head>
    <CategoryPage 
        v-if="currentCategory?.has_children"
        :="{category: currentCategory, breadcrumbs}" 
    />
    <CatalogPage
        v-else
        :="{category: currentCategory, breadcrumbs}" 
    />
</template>

<script setup>
    definePageMeta({
        nav: 'catalog',
        key: route => route.name,
        catalog: true,
    })

    const categoryName = computed(()=>R().params.categoryName);

    const fetchedCategory = ref();
    if(!useCategories().list?.length){
        ({data: {value: fetchedCategory.value}} = await useAPI(`/categories/category/${categoryName.value}`)) 
    }

    const currentCategory = computed(()=>
        useCategories().list?.length ? useCategories().category(categoryName.value, 'name') : fetchedCategory.value
    )

    if(!currentCategory.value)throw Error404(useRequestEvent());

    const breadcrumbs = computed(()=>[
        {title: 'Каталог товаров', href: '/catalog'},
        ...(
            useCategories().list.length?
                useCategories().breadcrumbs(categoryName.value, 'name')?.map(e => ({title: e?.title, href: `/catalog/${e?.name}`}))
                :[{loading: true}]
        )
    ])
</script>

<style lang="scss" scoped>

</style>