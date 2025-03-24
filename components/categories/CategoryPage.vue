<template>
    <div class="page category-page">
        <Breadcrumbs
            :list="breadcrumbs"
        />

        <PageTitle :title="category.title"/>

        <div class="category-page__container content-wrapper">
            <div class="category-page__aside">
                <CatalogFilterCategories 
                    :list="useCategories().getFilteredTree(()=>true)"
                    :all="false"
                    :isFilter="false"
                    @categories="catHandler"
                />
            </div>
            <div class="category-page__content">
                <div class="category-page__children" v-if="subCategories?.length">
                    <CategoryCard 
                        v-for="i in subCategories" 
                        :k="i.id"
                        :info="i"
                        hor
                    />
                </div>
                <ParsedHTML v-if="category?.description" :html="category?.description"/>
            </div>
        </div>

        <Benefits/>

        <ProdsHistory/>
    </div>
</template>

<script setup>
    const props = defineProps({
        category: Object,
        breadcrumbs: Array
    })
    
    const categoryName = computed(()=>R().params.categoryName);

    //sub
        const fetchedSubs = ref(); 

        if(!useCategories().list?.length){
            ({data: {value: fetchedSubs.value}} = await useAPI(`/categories/category/${categoryName.value}/subcategories`))
        }

        const subCategories = computed(()=>
            useCategories().list?.length ? useCategories().subCategories(props.category.id) : fetchedSubs.value.subcategories
        )

    const catHandler = (catsIds)=>{
        navigateTo(`/catalog/${useCategories().category(catsIds[0])?.name}`)
    }


</script>

<style lang="scss" scoped>
    .category-page{
        &__container{
            margin-bottom: 10rem;
            display: flex;
            gap: 3rem;
        }

        &__aside{
            width: 27rem;
            flex-shrink: 0;
        }

        &__children{
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 3rem;
            margin-bottom: 10rem;
        }

        @media (max-width: $navigation-mobile) {
            &__aside{
                display: none;
            }
        }

        @media (max-width: 800px) {
            &__children{
                grid-template-columns: 1fr;
            }
        }

        @media (max-width: $mobile) {
            &__container{
                margin-bottom: 6rem;
            }

            &__content{
                width: 100%;
            }

            &__children{
                gap: calc(var(--pad) / 2)
            }
        }
    }
</style>