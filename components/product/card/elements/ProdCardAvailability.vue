<template>
    <div 
        class="prod-card-availability"
        :style="{'--color': status.color}"
    >
        <div class="prod-card-availability__bar">
            <div v-for="i in status.num" class="prod-card-availability__col"></div>
        </div>
        <p class="font-h8">{{ status.title }}</p>
    </div>
</template>

<script setup>
    const props = defineProps({
        info: Object
    });

    const status = computed(()=>{
        const obj = (title, color, num)=>({title, color, num})

        if(!props.info?.in_stock)
            return obj('НЕТ В НАЛИЧИИ', 'var(--red-100)', 1); 

        return obj('В НАЛИЧИИ', 'var(--green-100)', 5);

        // quantities (их нет :ь)
        if(props.info?.quantities?.reduce((acc,e)=>acc+parseInt(e.quantity),0)<=3)
            return obj('ЗАКАНЧИВАЕТСЯ', 'var(--yellow-100)', 3); 

        // return obj('В НАЛИЧИИ', 'var(--green-100)', 5);
    })
</script>

<style lang="scss" scoped>
    .prod-card-availability{
        --color: var(--green-100);

        display: flex;
        align-items: center;
        gap: .8rem;
        
        color: var(--color);
        background: var(--white);

        &__bar{
            display: flex;
            gap: .2rem;
            width: 1.9rem;
            height: .6rem;
            padding: .1rem .2rem;
            border: .1rem solid var(--color);
        }

        &__col{
            width: .1rem;
            height: 100%;
            background: var(--color);
        }
    }
</style>