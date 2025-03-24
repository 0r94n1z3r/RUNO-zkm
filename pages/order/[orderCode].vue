<template>
    <div class="order-page">
        <Breadcrumbs
            :list="[{title: `Заказ ${order?.number || ''}`}]"
        />

        <div class="order-page__content content-wrapper">
            <Placeholder
                v-if="loading"
                class="order-card"
                type="block"
                style="--height:21.3rem;--width:100%;"
            />
            <OrderCard v-else-if="order" :info="order" />
            <Empty
                v-else
                icon="x"
                icon-size="20"
                title="Такой товар не найден"
                text="К сожалению, запрошенная вами товар не найден. Возможно, ссылка устарела."    
            >
                <Button
                    @click="handleError"
                    type="secondary"
                >
                    Вернуться на главную
                </Button>
            </Empty>
        </div>

    </div>
</template>

<script setup>
    definePageMeta({
        nav: 'cart'
    })

    const orderCode = computed(()=>R().params.orderCode);

    const loading = ref(true)
    const {data: order} = await useAPI(
        `/lk/order_without_account/${orderCode.value}`,
        {
            server: false,
            cache: 'no-cache',
            onResponse(){loading.value = false}
        }
    );
</script>

<style lang="scss" scoped>
    .order-page{
        &__content{
            .order-card{
                max-width: 90rem;
            }
        }
    }
</style>