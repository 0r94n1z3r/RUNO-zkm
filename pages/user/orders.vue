<template>
    <NuxtLayout
        name="user"
        title="Мои заказы"
    >
        <div 
            v-if="useUser().info"
            class="orders"
        >
        
            <template v-if="loading">
                <Placeholder 
                    v-for="i in 4"
                    type="block"
                    style="--width:100%;--height:21.1rem;"
                />
            </template>


            <Empty
                v-else-if="!list?.length"
                icon="shopping-cart"
                icon-size="18"
                title="У вас пока нет заказов"
                text="Вы можете сделать заказ в нашем каталоге товаров."
                button="Начать покупки"
                to="/catalog"
            />

            <template v-else>
                <OrderCard 
                    v-for="i in list"
                    :info="i"
                />
            </template>
        </div>
    </NuxtLayout>
</template>

<script setup>

    definePageMeta({
        name: 'Orders',
        private: true,
        nav: 'User'
    })

    const loading = ref(true);

    const {data: list} = useAPI(
        '/lk/orders',
        {
            server: false,
            cache: 'no-cache',
            transform(data){return data.orders.reverse()},
            onResponse(){loading.value = false}
        }
    );

</script>

<style lang="scss" scoped>
    .orders{
        @include flex-col;
        gap: 2.4rem;
    }
</style>