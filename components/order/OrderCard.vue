<template>
    <Card 
        class="order-card"
        :hov="false"
    >
        <div class="order-card__content">
            <div class="order-card__info">
                <h5 class="order-card__title">
                    Заказ <span>№ {{ info.number }}</span> от {{dayjs(info.created_at).format('DD.MM.YYYY')}}
                </h5>
                <h6 v-if="!HIDE.delivery">{{info.delivery_type == 0?'Самовывоз из пункта выдачи':'Доставка'}}</h6>
                <div class="order-card__info-strings">
                    <div class="order-card__info-string">
                        Статус:
                        <OrderStatus :="{info}"/>
                    </div>
                    <div v-if="!HIDE.delivery && info.delivery_type == 1" class="order-card__info-string">
                        Адрес доставки: <span>{{ addressDisplay({
                            city: info.delivery_city,
                            entrance: info.delivery_entrance,
                            flat: info.delivery_flat,
                            floor: info.delivery_floor,
                            house: info.delivery_house,
                            housing: info.delivery_housing,
                            storage_id: info.delivery_storage_id,
                            street: info.delivery_street,
                        }) }}</span>
                    </div>
                    <div class="order-card__info-string" v-if="!HIDE.payment">
                        Способ оплаты: <span>{{ payments.find(e => e.id == (info.payment_type_id||0))?.title }}</span>
                    </div>
                </div>
            </div>
            <div class="order-card-aside">
                <h6>Сумма заказа</h6>
                <div class="order-card-aside__strings">
                    <div class="order-card-aside__string">
                        <p>Количество товаров:</p>
                        <p>{{ useCart().getLength(info.products) }} шт.</p>
                    </div>
                    <!-- notdone -->
                    <!-- <div class="order-card-aside__string">
                        <p>Доставка:</p>
                        <p>350 ₽</p>
                    </div> -->
                </div>
                <div class="order-card-aside__total">
                    <h5>Итого:</h5>
                    <h5 class="order-card-aside__total-price">
                        <!-- nodone + цена доставки -->
                        {{ pricifyNumber(useCart().getTotal(info.products) + 0) }} ₽
                    </h5>
                </div>
            </div>
        </div>
        <div 
            class="order-card-contents"
            :class="{'order-card-contents--dropped': drop}"
        >
            <div 
                class="order-card-contents__caller"
                @click="drop = !drop"
            >
                <p class="text-link text-link--rev font-14">
                    Детали заказа
                </p>
                <Icon name="chevron-up" size="16"/>
            </div>
            <div class="order-card-contents__drop">
                <div class="order-card-contents__list">
                    <CheckoutProd v-for="(i,k) in info.products" :n="k+1" :info="i"/>
                </div>
                <NuxtLink 
                    class="text-link text-link--rev font-14"
                    :to="`/checkout?prods=${useCart().stringifyTmpCart(info.products)}`"
                >
                    Повторить заказ
                </NuxtLink>
            </div>
        </div>
    </Card>
</template>

<script setup>
    import HIDE from '@/hide-config.json';

    const dayjs = useDayjs();

    const props = defineProps({
        info: Object
    })

    const drop = ref();

//payment
    const payments = ref([ // notdone (возможно нужно зафетчить)
        {title: 'При получении', id: 0, value: true},
        {title: 'Картой онлайн', id: 1},
    ])

</script>

<style lang="scss" scoped>
    .order-card{
        padding: 2.4rem;
        
        &__content{
            display: flex;
            align-items: start;
            gap: 3rem;
            margin-bottom: .8rem;
        }

        &__info{
            width: 100%;

            h6{
                margin-bottom: 1.6rem;
            }
        }

        &__title{
            margin-bottom: 3.2rem;

            span{
                color: var(--orange-100);
            }
        }

        &__info-strings{
            @include flex-col;
            gap: .8rem;
        }

        &__info-string{
            @include font-14;

            .order-status{
                display: inline-block;
            }

            span{
                color: var(--black-60);
            }
        }
    }

    .order-card-aside{
        width: 26.8rem;
        border-radius: 1.2rem;
        padding: 1.6rem;
        background: var(--black-5);
        flex-shrink: 0;

        h6{
            margin-bottom: 1.6rem;
        }

        &__strings{
            @include flex-col;
            gap: .8rem;
        }

        &__string{
            @include flex-jtf;
            @include font-14;
        }

        &__total{
            margin-top: 1.6rem;
            padding-top: 1.6rem;
            border-top: .1rem solid var(--black-40);
            @include flex-jtf;
        }

        &__total-price{
            color: var(--orange-100);
        }
    }

    .order-card-contents{
        &__caller{
            display: flex;
            align-items: center;
            gap: .8rem;
            color: var(--orange-100);
            cursor: pointer;
            @include virtual-area(.8rem);
            width: max-content;

            .icon{
                transition: .3s;
            }
        }

        &__list{
            @include flex-col;
            gap: 1.6rem;
            margin: 3.2rem 0;
            padding: 3.2rem 0;
            border: solid var(--black-10);
            border-width: .1rem 0;
        }

        &:not(&--dropped){
            .order-card-contents{
                &__drop{
                    display: none;
                }

                &__caller .icon{
                    transform: rotate(.5turn);
                }
            }
        }
    }

    @media (max-width: $navigation-mobile){
        .order-card{
            &__content{
                flex-direction: column;
                margin-bottom: 2.4rem;
            }
        }

        .order-card-aside{
            width: 100%;
        }
    }

    @media (max-width: $mobile){
        .order-card{
            padding: 1.6rem;

            &__title{
                margin-bottom: 2.4rem;
            }
        }
    }

</style>