<template>
    <Card 
        class="checkout-products"
        :hov="false"
    >
        <h3>Товары в заказе</h3>
        <div class="checkout-products__list">
            <CheckoutProd v-for="(i,k) in R_List" :info="i" :n="k+1"/>
        </div>
        <div class="checkout-products__total-wr">
            <CartTotal
                :="{err, loading}"
                :list="R_List"
                @checkout="emit('checkout')"
            />
        </div>
    </Card>
</template>

<script setup>
    const props = defineProps({
        list: Array,
        err: String,
        loading: Boolean,
    })

    const emit = defineEmits(['checkout']);

    const R_List = computed(()=>props.list || useCart().list)
</script>

<style lang="scss" scoped>
    .checkout-products{
        padding: 2.4rem;

        h3{
            margin-bottom: 3.2rem;
        }

        &__list{
            @include flex-col;
            gap: 1.6rem;
        }

        &__total-wr{
            padding-top: 2.4rem;
            margin-top: 2.4rem;
            border-top: .1rem solid var(--black-20);
        }

    }
</style>