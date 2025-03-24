<template>
    <NuxtLayout
        name="user"
        title="Избранные товары"
    >

        <CatalogList v-if="useFavorites().loading" loading="true" />

        <Empty
            v-else-if="!list.length"
            icon="heart"
            icon-size="20"
            title="У вас пока нет избранных товаров"
            text="Вы можете добавить товары в избранное, чтобы быстро найти их позже."
            button="Начать покупки"
            to="/catalog"
        />

        <div 
            v-else
            class="catalog__content" 
        >
            <CatalogSwitches
                class="catalog-switches"
                v-model:view="view"
                :total="useFavorites().list?.length"
                :has-filters="false"
            />
            <CatalogList
                class="catalog-list" 
                :="{
                    view,
                    list,
                    loading: useUser().loading || useFavorites().loading,
                }"
            />
        </div>

    </NuxtLayout>
</template>

<script setup>
    definePageMeta({
        name: 'Favorites',
        private: true,
        nav: 'Favorites'
    })

    //view
        const view = ref('normal');
        watch(
            view, 
            (n,o)=>{
                if(n == o || !sessionStorage)return;
                sessionStorage.ZKM_view = view.value;
            }
        );
        
        const mounted = ref();

        onMounted(()=>{
            if(sessionStorage?.ZKM_view)view.value = sessionStorage.ZKM_view;
            mounted.value = true;
        })

    //list
        const sortArray = (arr, config) => {
            const { key, order } = config;

            return arr.sort((a, b) => {
                let A = Number(a[key] || 0);
                let B = Number(b[key] || 0);

                if (A < B) return order == "asc" ? -1 : 1;
                if (A > B) return order == "asc" ? 1 : -1;
                return 0;
            });
        }

        const list = ref([]);

        watch(
            ()=>[
                useFavorites().loading,
                useFilters().sortByDisplay,
                useFilters().filter
            ], 
            async ()=>{
                list.value = sortArray(
                    JSON.parse(JSON.stringify(useFavorites().list)),
                    useFilters().sortByDisplay
                ).filter(e => {
                    let cats = useFilters().filter?.selectedCategories;
                    if(!cats?.length)return true;
                    return cats.includes(e.category_id);
                })
            },
            {
                immediate: true,
                deep: true,
            }
        )
</script>

<style lang="scss" scoped>
    :deep(.catalog-switches){
        margin-bottom: 1.2rem!important;
    }
</style>