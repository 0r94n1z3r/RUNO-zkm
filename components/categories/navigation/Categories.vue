<template>
    <ClientOnly>
        <div 
            class="categories"
            :class="{'categories--called': useCategories().called}"
            @click.self="close"
        >
            <div class="categories__wrapper" @click.self="close">
                <div class="categories__columns-wrapper content-wrapper" @click.self="close">
                    <div class="categories__columns" @click.self="close">

                        <CategoryColumnOG 
                            class="category-column"
                            :="{ids}"
                            @next="updateColumns($event, 0)"
                            @start="updateColumns(null, 0)"
                        />

                        <CategoryColumn 
                            class="category-column" 

                            v-for="(id, k) in [...(ids||[])]" 
                            :="{id, ids, k: k+1}"

                            @next="updateColumns($event, k+1)"
                            @prev="updateColumns(ids[k-1], k-1)"
                            @start="updateColumns(null, 0)"
                        />

                        <!-- <div class="fake-category-column" v-show="ids.length < 3" @click.self="close"></div> -->
                        <div class="fake-category-column" v-show="ids.length < 2" @click.self="close"></div>
                        <div class="fake-category-column" v-show="ids.length < 1" @click.self="close"></div>
                    </div>
                </div>
            </div>
        </div>
    </ClientOnly>
</template>

<script setup>
    const ids = computed(()=>useCategories().navIds);

    const updateColumns = (newId, k)=>{
        if(newId == null){
            useCategories().navIds = [];
        }else if(useCategories().hasSubCategories(newId)){
            ids.value.splice(k, ids.value.length-(k), newId);
        }else{
            ids.value.splice(k, ids.value.length-(k))
        }
    }

    const close = ()=>{
        useCategories().called = false;
    }
</script>

<style lang="scss" scoped>
    .categories{
        position: fixed;
        left: 0;
        right: 0;
        z-index: 99;
        flex-grow: 1;
        transition: .3s;

        // min-height: max-content;

        // background: var(--black-transparent);
        
        height: calc(100% - var(--header-height));
        top: var(--header-height);

        @media (max-width: $navigation-mobile){
            height: calc(100% - var(--mobile-navigation-height));
            position: absolute;
        }

        @include flex-col;

        &:not(&--called){
            @include hidden(-1rem);
        }
        
        &__wrapper{
            display: flex;
            max-height: calc(100 * var(--vh) - var(--header-height));
            overflow: hidden;
            filter: drop-shadow(0 .4rem .5rem rgba(160, 158, 177, 0.25));
        }

        &__columns-wrapper{
            display: flex;
        }
        
        &__columns{
            display: flex;
            flex-shrink: 0;
            width: 100%;
            justify-content: flex-end;
        }

        @media (min-width: calc($navigation-mobile + 1px)){
            &__columns{
                >:nth-child(1 of .category-column){
                    border-radius: 0 0 0 .8rem;
                }

                >:nth-last-child(1 of .category-column){
                    border-radius: 0 0 .8rem 0;
                }
            }
        }


        @media (max-width: $navigation-mobile){
            background: var(--black-transparent);

            &__wrapper{
                max-height: unset;
            }

            &__columns-wrapper{
                padding: 0;
            }


            // .category-column{
            //     margin-bottom: 50rem;
            // }
        }
    }

    .category-column{
        width: 33.3%;
        flex-shrink: 0;
        overflow-y: auto;
        overscroll-behavior: contain;
    }

    .fake-category-column{
        width: 33.3%;
        flex-shrink: 0;
    }

    @media (max-width: 1100px){
        .category-column,
        .fake-category-column
        {
            width: 33.33%;
        }

        // :nth-child(1 of .fake-category-column){
        //     display: none;
        // }
    }

    @media (max-width: 775px){
        .category-column,
        .fake-category-column
        {
            width: 50%;
        }

        // :nth-child(2 of .fake-category-column){
        :nth-child(1 of .fake-category-column){
            display: none;
        }
    }

    @media (max-width: 500px){
        .category-column{
            width: 100%;
            border: none;
        }

        .fake-category-column{
            display: none;
        }
    }
</style>