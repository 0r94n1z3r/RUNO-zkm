<template>
    <div class="page cart">

        <Breadcrumbs 
            :list="[{title: 'Корзина покупок'}]"
        />
        <PageTitle
            title="Корзина покупок"
        />

        <CartPreloader v-if="useCart().tmpCartLoading || useCart().initLoading"/>

        <Empty
            v-else-if="!useCart().list.length"
            icon="shopping-cart"
            icon-size="18"
            title="В корзине пока ничего нет"
            text="Вы можете начать свой выбор с главной страницы или воспользоваться поиском, если ищете что-то конкретное."
            button="Начать покупки"
            to="/catalog"
        />

        <template v-else>
            <div class="content-wrapper">
                <CartRemove/>
            </div>

            <CartList/>

            <div class="cart__fin content-wrapper">
                <CartTotal
                    @checkout="navigateTo('/checkout')"
                />
            </div>
        </template>

        <ProdsHistory/>
    </div>
</template>

<script setup>
    definePageMeta({
        nav: 'Cart'
    })

    const { isHydrating } = useNuxtApp()

    onMounted(()=>{
        if(!isHydrating){
            useCart().update()
        }
    });
    onUnmounted(()=>{useCart().purify()});

</script>

<style lang="scss" scoped>
    .cart{
        .cart-list{
            margin-bottom: 4rem;
        }

        &__fin{
            margin-bottom: 10rem;
            display: flex;
            align-items: start;
            gap: 1.6rem;

            @media (max-width: 780px) {
                flex-direction: column;
            }
        }
    }
</style>