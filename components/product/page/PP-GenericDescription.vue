<template>
    <div class="pp-description" v-if="currentCategory?.description">
        <ParsedHTML :html="currentCategory?.description"/>
    </div>
</template>

<script setup>
    const props = defineProps({
        info: Object
    })

    const fetchedCategory = ref();
    if(!useCategories().list?.length){
        ({data: {value: fetchedCategory.value}} = await useAPI(`/categories/category/${props.info.category_id}`)) 
    }

    const currentCategory = computed(()=>
        useCategories().list?.length ? useCategories().category(props.info.category_id, 'name') : fetchedCategory.value
    )

</script>

<style lang="scss" scoped>
    h2{
        margin-bottom: 2.4rem;
    }
</style>