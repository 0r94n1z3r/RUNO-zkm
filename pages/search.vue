<template>
    <NuxtLayout
        class="search-page"
        ref="catalogRef"

        name="catalog"
        title="Результаты поиска"
        
        :={mounted}

        :breadcrumbs="{list: [
            {title: 'Результаты поиска'}
        ]}"

        :endpoint="`/search`"

        :showContent="!empty"
        @empty="empty = true"
    >
        <template #default="{total}">
            <Empty 
                v-if="empty"
                icon="search"
                icon-size="20"
                :title="`По запросу «${R().query.q}» ничего не найдено`"
                text="Не удалось найти товары, содержащие слова из Вашего запроса."
            >
                <div class="empty-search">
                    <Search
                        @keydown.enter="navigateTo({path: '/search', query: {q: useSearch().searchText}})"
                        v-model="useSearch().searchText"
                    />
                    <Button
                        type="secondary"
                        @click="navigateTo({path: '/search', query: {q: useSearch().searchText}})"
                    >
                        Искать
                    </Button>
                </div>
            </Empty>
            <div class="content-wrapper" v-if="!empty">
                <h3>{{
                    `
                    По запросу 
                    «${R().query.q}» 
                    ${ pluralizeWord(['найден', 'найдено', 'найдено'], R_total) } 
                    ${total} 
                    ${pluralizeWord(['товар', 'товара', 'товаров'], total)}
                    `
                }}</h3>
            </div>
        </template>
    </NuxtLayout>
</template>

<script setup>
    definePageMeta({
        nav: 'Home',
        key: route => route.name,
        name: 'Search'
    })

    const mounted = ref();
    onMounted(()=>mounted.value = true);

    const catalogRef = ref();

    watch(()=>R().query.q, n=>{
        console.log(n);
        if(n){
            catalogRef.value.layoutRef?.forceUpdate();
            empty.value = false;
        }
    })

    const empty = ref(false);
</script>

<style lang="scss" scoped>
    h3{
        margin-bottom: 6rem;
    }

    .empty{
        margin-top: 6rem;
        margin-bottom: 20rem;
    }

    .empty-search{
        display: flex;
        gap: 3rem;
        width: 100%;
    }
</style>