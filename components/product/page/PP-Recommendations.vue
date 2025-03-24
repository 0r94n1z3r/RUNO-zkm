<template>
    <div class="pp-recommendations content-wrapper" v-if="list.length">
        <h2>С этим товаром покупают</h2>
        <ProdsCarousel :list="list"/>
    </div>
</template>

<script setup>
    const props = defineProps({
        info: Object
    })

    const list = ref([]);

    const updateList = async ()=>{
        list.value = [];

        try{
            const {data: {value: fetched}} = await useAPI(
                `/products/recomendations/${props.info.id}`,
            );
            
            list.value = fetched;
        }catch (error) {
            // notdone
            console.error("Ошибка при получении информации о продукте:", error);
        }
    }

    if(props.info?.id){
        if(process.server){
            await updateList();
        }else{
            updateList();
        }
    }

    watch(
        ()=>props.info?.id,
        (n)=>{
            if(n)updateList();
        }
    )
</script>

<style lang="scss" scoped>
    h2{
        margin-bottom: 4rem;
        
        @media (max-width: $mobile) {
            @include font-h3;
        }
    }
</style>