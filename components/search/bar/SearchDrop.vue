<template>
    <Card 
        class="search-drop"
        :class="{
            'search-drop--called': 
                called && 
                (
                    useSearch().categories.length || 
                    useSearch().brands.length || 
                    useSearch().productsLoading || 
                    useSearch().products?.length
                )
        }"
        :hov="false"
    >
        <NuxtLink 
            class="search-drop__item" 
            v-for="i in useSearch().categories"
            :to="`/catalog/${i.name}`"
            @click="emit('clicked')"
        >
            {{ i.title }}
        </NuxtLink>

        <NuxtLink 
            class="search-drop__item" 
            v-for="i in useSearch().brands"
            :to="useBrands().link(i.name)"
            @click="emit('clicked')"
        >
            {{ i.title }}
        </NuxtLink>


        <div class="search-drop__loading" v-if="useSearch().productsLoading">
            <Loading />
        </div>
        <NuxtLink 
            class="search-drop__item text-link--basic" 
            v-else-if="useSearch().products?.length"
            v-for="i in useSearch().products.slice(0,4)"
            :to="`/product/${i.name}`"
            @click="emit('clicked')"
        >   
            <!-- <Icon name="essentials__search" size="20" /> -->
            <p>{{ i.title }}</p>
        </NuxtLink>
    </Card>
</template>

<script setup>
    const props = defineProps({
        called: Boolean
    })

    const emit = defineEmits(['clicked']);
</script>

<style lang="scss" scoped>
    .search-drop{
        overflow: hidden;
        border-radius: .4rem;
        background: var(--white);
        @include flex-col;
        width: 100%;
        padding: .6rem 0;
        transition: .3s;
        z-index: 10;

        &:not(&--called){
            @include hidden(-1rem)
        }

        &__item{
            padding: .6rem 1.2rem;
            transition: .3s;

            @media (hover: hover){
                &:hover{
                    background: var(--orange-20);
                }
            }
        }

        &__loading{
            padding: .6rem 1.2rem;
            .loading{
                margin: 0;
                --size: 2rem;
                --color: var(--black-60);
            }
        }
    }
</style>