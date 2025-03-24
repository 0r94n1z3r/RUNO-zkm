<template>
    <NuxtLayout 
        name="catalog"
        ref="catalogRef"
        :title="category?.title"
        :breadcrumbs="{list: breadcrumbs}"
        :show-content="!category?.has_children"
        :endpoint="`/categories/products/${categoryName}`"
        :description="category?.description"
        has-filters
    >
        <Landings :={category} />

        <template #filters>
            <CatalogFilters :id="categoryName"/>
        </template> 
    </NuxtLayout>
</template>

<script setup>
    definePageMeta({
        name: "Catalog",
        key: route => route.name
    })
    
    const categoryName = computed(()=>R().params.categoryName);

    const props = defineProps({
        category: Object,
        breadcrumbs: Array
    });

    const catalogRef = ref();

//scroll top
    watch(categoryName, (n)=>{
        setTimeout(()=>{
            // useWindowScroll().y.value = 0;
            if(n && !useCategories().hasSubCategories(categoryName.value, 'name')){
                catalogRef.value.layoutRef?.forceUpdate();
            }  
        })
    })

</script>

<style lang="scss" scoped>
    .landings{
        margin-bottom: 3.2rem;
    }    
</style>