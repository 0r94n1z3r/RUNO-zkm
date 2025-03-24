<template>
    <HomeWrapper 
        class="compilation-products"
        title="Лучшее предложение"
        v-if="!loading && list?.length"
    >
        <ProdsCarousel
            :list="list"
            :loading="loading"
        />
    </HomeWrapper>
</template>

<script setup>
    const list = ref([]);

    const total = ref();
    const loading = ref(true);

    const updateList = async ()=>{
        loading.value = true;
        total.value = null;

        try{
            const {data: {value: fetched}} = await useAPI( // notdone (Вероятно не new, а что-то другое...)
                `/products/promotions`,
            );

            if(!fetched)return;
            
            list.value = fetched.products;
            total.value = fetched.total;
            
        }catch (error) {
            // notdone
            console.error("Ошибка при получении информации о продукте:", error);
        }finally{
            loading.value = false;
        }
    }

    if(process.client){
        updateList();   
    }

</script>

<style lang="scss" scoped>

</style>