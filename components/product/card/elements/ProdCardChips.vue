<template>
    <div class="prod-card-chips" v-if="R_list?.some(l => l?.length)">
        <div 
            v-for="l in R_list"
            class="prod-card-chips__container"
        >
            <div 
                v-for="i in l"
                class="prod-card-chips__chip"
                :style="{
                    '--color': i.color,
                    '--alt-color': i['alt-color'] || i.color
                }"
            >
                <p>{{ i.title }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        info: Object,
        list: Array, //[{title, color, alt-color}]
        optimizeView: {
            type: Boolean,
            default: true
        }
    })

    const R_list = computed(()=>
        props.list?[[], props.list]:defaultList.value
    )

// Новинка
// Стоп-цена
// Распродажа
// Подарок
// Акция
// -[число]%

    const defaultList = computed(()=>{
        if(!props?.info)return null;

        let res = [[],[]];

        if(props.info.new)
            res[0].push({title: 'Новинка', color: 'var(--green-100)', 'alt-color': 'var(--green-40)'})
        
        if(props.info.stop)
            res[0].push({title: 'Стоп-цена', color: 'var(--red-100)', 'alt-color': 'var(--red-40)'})
            
        if(props.info.promotion)
            res[0].push({title: 'Распродажа', color: 'var(--red-100)', 'alt-color': 'var(--red-40)'})
            
        if(props.info.sale) //?
            res[0].push({title: 'Акция', color: 'var(--red-100)', 'alt-color': 'var(--red-40)'})

        if(props.info.present) //?
            res[0].push({title: 'Подарок', color: 'var(--yellow-100)', 'alt-color': 'var(--yellow-40)'})

        // if(props.info.hit) //?

        if(
            props.info.price_before && 
            parseFloat(props.info.price_before)>parseFloat(props.info.price)
        ){
            res[1].push({
                title: `-${Math.round(100 * (1 - props.info.price / props.info.price_before))}%`, 
                color: 'var(--red-100)',
                'alt-color': 'var(--red-40)'
            })
        }

        res[0] = res[0].slice(0,2);

        if(!res[0].length){
            res[0] = res[1];
            res[1] = [];
        }

        if(!res[1].length && props.optimizeView){
            res[1] = res[0];
            res[0] = [];
        }

        return res;
    })
</script>

<style lang="scss" scoped>
    .prod-card-chips{
        --gap: .8rem;
        --padding: .6rem .8rem;
        --color: var(--orange-100);
        --alt-color: var(--orange-30);
        --rad: .4rem;

        font-size: 1.4rem;
        line-height: 1.2rem;

        @include flex-jtf;
        gap: var(--gap);

        &__container{
            display: flex;
            gap: var(--gap);
        }

        &__chip{
            padding: var(--padding);

            color: var(--color);
            position: relative;
            border-radius: var(--rad);

            p{
                position: relative;
            }

            &::before,
            &::after
            {
                @include pseudo-absolute;
                @include all-directions(0);
                border-radius: var(--rad);
            }

            &::before{
                background: var(--white);
                opacity: .5;
                backdrop-filter: blur(1rem);
            }

            &::after{
                border: .1rem solid var(--alt-color);
            }
        }

        @media (max-width: $mobile) {
            --padding: .4rem .6rem;
            --gap: .4rem;
            font-size: 1rem;
        }
    }
</style>