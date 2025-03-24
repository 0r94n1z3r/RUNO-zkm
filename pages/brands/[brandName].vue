<template>
    <NuxtLayout 
        name="catalog"
        :title="currentBrand?.title"
        :breadcrumbs="{
            list: [
                {title: 'Бренды', href: '/brands'}, 
                {title: currentBrand?.title}
            ]
        }"
        :endpoint="`/products/`"
        :defaultFilters="{selectedBrands: [brandName]}"
    >
        <template #filters>
            <CatalogFilterCategories 
                :list="tree" 
                :loading="useCategories().initLoading || useBrands().initLoading || !tree.length"
            />
        </template> 
    </NuxtLayout>
    <div>{{brand}}</div>
</template>

<script setup>
    definePageMeta({
        name: "Brand",
        key: route => route.name,
        catalog: true,
    })

    const brandName = computed(()=>R().params.brandName);

    const fetchedBrand = ref();
    if(!useBrands().list?.length){
        ({data: {value: fetchedBrand.value}} = await useAPI(`/brands/brand/${brandName.value}`)) 
    }

    const currentBrand = computed(()=>
        useBrands().list?.length ? useBrands().brand(brandName.value, 'name') : fetchedBrand.value
    )

    if(!currentBrand.value)throw Error404(useRequestEvent());

    const tree = ref([]);
    
    const updateTree = async ()=>{
        tree.value = [];
        await new Promise(r => setTimeout(r));
        tree.value = await useCategories().getBrandTree(currentBrand.value?.id);
    }
    
    watch(
        ()=>[brandName, useCategories().initLoading, useBrands().initLoading],
        (n)=>{
            if(brandName.value && !useCategories().initLoading && !useBrands().initLoading)updateTree();
        },
        {immediate: true}
    )

</script>

<style lang="scss" scoped>
    
</style>