<template>
    <div class="checkout-prod">
        <div class="checkout-prod__n">{{ n }}.</div>
        <div class="checkout-prod__content">
            <p class="checkout-prod__name">{{ info.title }}</p>
            <div class="checkout-prod__num">{{ info.count }} {{ info.unit }}.</div>
            <h6 class="checkout-prod__price">{{ pricifyNumber(info.price * info.count) }} ₽</h6>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        n: Number,
        info: Object
    })
</script>

<style lang="scss" scoped>
    .checkout-prod{
        display: flex;
        align-items: baseline;
        gap: .8rem;

        &__content{
            gap: .8rem;
            display: flex;
            width: 100%;
        }

        &__n,
        &__num{
            color: var(--black-40);
            @include font-14;
            white-space: nowrap;
        }

        &__name{
            width: 100%;
        }

        &__num{
            min-width: 7rem;
            display: flex;
            justify-content: center;        
            flex-shrink: 0;
        }

        &__price{
            white-space: nowrap;
            text-align: end;
            min-width: 9rem;
            flex-shrink: 0;
        }

        @media (max-width: $mobile) {
            &__content{
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: .4rem;
            }

            &__name{
                grid-column: 1/-1;
            }

            &__num{
                min-width: unset;
                justify-content: start;
            }
        }
    }
</style>