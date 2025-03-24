<template>
    <div 
        v-if="info"
        class="cart-product" 
        :key="info.id || Math.random()"
    >
        <div class="cart-product__container cart-product__content">
            <ProdCardActions
                :="{info}"
                :list="['trash','like']"
                @action="(e)=>{if(e == 'trash')useCart().changeAmount(info, 0)}"
            />
            <p class="cart-product__number">{{ n }}</p>
            <NuxtLink
                class="text-link--basic cart-product__image"
                :to="`/product/${info.name}`"
            >
                <ProdCardMedia 
                    :="{info}"
                    single
                    size="84"
                />
            </NuxtLink>
            <NuxtLink
                class="cart-product__title text-link--basic"
                :to="`/product/${info.name}`"
            >
                {{ info.title }}
            </NuxtLink>
        </div>
        <div class="cart-product__container cart-product__prices">
            <div class="cart-product__price-wr">
                <ProdCardPrice :="{info}"/>
            </div>
            <ProdCardButton
                emptyTitle="Добавить"
                :="{info}"
                full
            />
            <div class="cart-product__total-price-wr">
                <h5 class="cart-product__total-price">{{ pricifyNumber(info.price * info.count) }} ₽</h5>
                <p class="cart-product__single-price font-h7">{{ pricifyNumber(info.price) }} ₽/{{ info.unit }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        info: Object,
        n: Number,
    })
</script>

<style lang="scss" scoped>
    .cart-product{
        display: grid;
        gap: 1.6rem 7.4rem;
        grid-template-columns: 1fr 1fr;
        @include padding-y(2.4rem);
        border-bottom: .1rem solid var(--black-10);

        &__container{
            display: flex;
            gap: 3.2rem;
            align-items: center;
        }

        .prod-card-media{
            width: 7rem;
        }

        &__title{
            min-height: 7rem;
            display: flex;
            align-items: center;
        }

        &__price-wr{
            min-width: 12rem;
            .prod-card-price{
                flex-direction: column-reverse;
                align-items: end;
                width: max-content;
                gap: .2rem;

                :deep(.prod-card-price__current){
                    color: var(--black-100)!important;
                }
            }
        }
        

        .prod-card-button{
            max-width: 13.8rem;
            :deep(.prod-card-button__button){
                height: 4rem;
            }
        }

        &__total-price-wr{
            margin-left: auto;
            text-align: end;
        }

        &__total-price{
            white-space: nowrap;
        }

        &__single-price{
            color: var(--black-40);
            display: none;
            white-space: nowrap;
        }

        &__image{
            background: var(--white);
            overflow: hidden;
            flex-shrink: 0;
            border-radius: .8rem;
        }

        @media (max-width: $navigation-mobile) {
            grid-template-columns: 1fr;

            &__content{
                align-items: flex-start;
            }

            .prod-card-actions{
                order: 99;
                flex-direction: column;
                margin-left: auto;

                :deep(.button){
                    height: 3.2rem;
                    width: 3.2rem;
                }
            }

            .prod-card-price{
                display: none;
            }

            &__single-price{
                display: block;
                margin-top: .4rem;
            }
        }

        @media (max-width: $mobile) {
            @include padding-y(1.6rem);

            &__container{
                gap: .8rem;
            }

            &__title{
                @include font-h8;
                align-items: flex-start;
            }

            &__prices{
                @include flex-jtf;
            }

            &__price-wr{
                display: none;
            }

            :deep(.prod-card-button__button){
                @include font-14;
            }
        }
    }
</style>