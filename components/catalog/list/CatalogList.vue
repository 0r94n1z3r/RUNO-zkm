<template>
    <div class="catalog-list">
        <template v-if="isMounted && !list?.length">
            <CatalogPreloader 
                v-if="loading || (!list?.length && process?.server)" 
                :="{view}"
            />
            <CatalogEmpty
                v-else
                :text="
                    hasFilters?
                    'Попробуйте изменить параметры фильтра или сбросить выбранные значения':
                    ''                    
                "
            >
                <!-- notdone -->
                <template v-if="hasFilters && useFilters().isFiltersActive">
                    <p
                        class="text-link text-link--rev font-14"
                        @click="useFilters().reset()"
                    >
                        Сбросить фильтры
                    </p>
                </template>
            </CatalogEmpty>
        </template>
        <template v-else>
            <div 
                class="catalog-list__container"
                :class="
                    [
                        `catalog-list__container--${view}`,
                        loading && list?.length && page.length == 1 && `catalog-list__container--loading`
                    ]
                "
            >
                <RenderWrapper v-for="i in list" v-slot="{isVisible}">
                    <ProdCard
                        :info="{loading: !isVisible, ...i}"
                        :type="view"
                        class="desk-visible"
                    />
                    <ProdCard
                        :info="{loading: !isVisible, ...i}"
                        class="mob-visible"
                    />
                </RenderWrapper>
            </div>
            <PagLoader
                v-if="hasPagination && totalPages > 1"
                v-model="page" 
                v-model:pagPause="pagPause" 
                :="{totalPages, loading}"
            />
        </template>
    </div>
</template>

<script setup>
    const props = defineProps({
        view: String, // normal / horizontal
        list: Array,
        loading: Boolean,
        
        hasPagination: Boolean,
        totalPages: Number,
        hasFilters: Boolean,
    })

    const page = defineModel('page');
    const pagPause = defineModel('pagPause');

    const isMounted = ref(false);
    onMounted(()=>isMounted.value = true);
</script>

<style lang="scss" scoped>
    .catalog-list{
        .pagination{
            margin-top: 3.2rem;
        }

        .prod-card{
            width: auto;
        }

        &__container{
            gap: 3rem;
            transition: .3s;
            --size: minmax(0, 27.1rem);

            &--horizontal{
                @include flex-col;
            }

            &--normal{
                display: grid;
                grid-template-columns: repeat(3, var(--size));

                @media (max-width: 1150px) {
                    grid-template-columns: repeat(2, var(--size));
                }
            }

            &--loading{
                animation: breathe 1s alternate infinite;
            }

            @include mob-display($navigation-mobile);

            @media (max-width: $navigation-mobile) {
                display: grid;
                grid-template-columns: repeat(3, var(--size));
            }

            @media (max-width: 850px) {
                grid-template-columns: repeat(2, var(--size));
            }

            @media (max-width: $mobile) {
                gap: var(--pad) calc(var(--pad) / 2);
                grid-template-columns: repeat(2, var(--size));
            }
        }
    }
</style>