<template>
    <div class="cart-total">
        <div class="cart-total__string" v-if="discount">
            <p>Скидка:</p>
            <h3>{{ pricifyNumber(discount) }} ₽</h3>
        </div>
        <div class="cart-total__string">
            <p>Итого:</p>
            <h3>{{ pricifyNumber(useCart().getTotal(R_List)) }} ₽</h3>
        </div>
        <Err :="{err}" />
        <div class="cart-total__buttons">
            <Button
                to="/catalog"
                type="secondary"
                :="{loading}"
            >
                Продолжить покупки
            </Button>
            <Button
                @click="emit('checkout')"
                :="{loading}"
            >
                Оформить заказ
            </Button>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        list: Array,
        loading: Boolean,
        err: String,
    })


    const emit = defineEmits(['checkout']);

    const R_List = computed(()=>props.list || useCart().list)

    const discount = computed(()=>
        useCart().getTotal(R_List.value) - 
        useCart().getTotal(R_List.value, 'old_price')
        //Number(R_List.value?.reduce((acc, e) => acc + (Math.ceil(e.old_price || e.price) * Number(e.count)), 0).toFixed(2))
    )
</script>

<style lang="scss" scoped>
    .cart-total{
        min-width: 0;
        @include flex-col;
        gap: 1.6rem;
        align-items: end;
        width: 100%;

        &__string{
            display: flex;
            align-items: center;
            gap: 1.6rem;

            p{
                @include font-14;
            }

            h3{
                min-width: 20rem;
                text-align: end;
                white-space: nowrap;
            }
        }

        &__buttons{
            display: flex;
            gap: .8rem 3.2rem;
            min-width: 0;
            margin-top: 2.4rem;


            .button{
                width: 100%;
                min-width: max-content;
                flex-shrink: unset;
            }

            
        }

        @media (max-width: 580px) {
            &__string{
                width: 100%;
                justify-content: space-between;

                h3{
                    min-width: unset;
                }
            }

            &__buttons{
                flex-direction: column;
                width: 100%;
            }
        }
    }
</style>