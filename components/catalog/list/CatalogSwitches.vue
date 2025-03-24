<template>
    <div class="catalog-switches">
        <div class="catalog-switches__container">
            <div class="catalog-switches-sort">
                <div class="catalog-switches-sort__caller" ref="sortByDropdownCallerRef">
                    <div class="catalog-switches-sort__caller-trigger" @click="sortByDropdownRef.switchCall()">
                        <Icon 
                            class="catalog-switches-sort__direction"
                            :class="`catalog-switches-sort__direction--${useFilters().sortByDisplay.order}`"
                            name="bar-chart" 
                            size="16"
                        />
                        <p>{{useFilters().sortByDisplay.title}}</p>
                        <Icon name="chevron-down" size="16"/>
                    </div>
                    <Dropdown 
                        class="catalog-switches-sort__drop" 
                        ref="sortByDropdownRef" 
                        no-title
                    >
                        <div 
                            class="catalog-switches-sort__drop-item"
                            v-for="i in useFilters().sortByList" 
                            @click="()=>{useFilters().setSortby(i); sortByDropdownRef.close()}"
                        >
                            {{ i.title }}
                        </div>
                    </Dropdown>
                </div>
            </div>
        </div>
        <div class="catalog-switches__container">
            <FiltersCaller v-if="hasFilters" class="mob-visible"/>
            <p class="catalog-switches-total desk-visible">
                {{ pluralizeWord(['Найден', 'Найдено', 'Найдено'], total) }}
                <span>{{ total }}</span>
                {{pluralizeWord(['товар', 'товара', 'товаров'], total)}}
            </p>
            <div class="catalog-switches-view desk-visible">
                <div 
                    class="catalog-switches-view__item text-link--basic" 
                    :class="{
                        'catalog-switches-view__item--active': v.name == view
                    }" 
                    v-for="v in views"
                    @click="view = v.name"
                >
                    <Icon :name="v.icon"/>
                </div>
            </div>
        </div>        
    </div>
</template>

<script setup>

const props = defineProps({
    total: Number,
    hasFilters: {
        type: Boolean,
        default: true
    }
})

const view = defineModel("view");

//sortBy
    const sortByDropdownRef = ref();
    const sortByDropdownCallerRef = ref();

    onClickOutside(
        sortByDropdownCallerRef, 
        () => sortByDropdownRef.value.close()
    )

//views
    const views = ref([
        {name: 'normal', icon: 'view-grid'},
        {name: 'horizontal', icon: 'view-list'},
    ])
</script>

<style lang="scss" scoped>
    .catalog-switches{
        overflow: unset;
        align-items: center;
        @include flex-jtf;
        position: sticky;
        top: calc(var(--header-height));
        z-index: 4;
        background: var(--gray-5);
        
        @include virtual-area(1.2rem);
        padding-top: 3.2rem;
        margin-top: -3.2rem;

        &__container{
            display: flex;
            gap: 2.1rem 2.4rem;
            align-items: center;

        }
        
        @media (max-width: $navigation-mobile) {
            align-items: start;

            &__container{
                flex-direction: column;
            }

            padding-top: 1.2rem;
            margin-top: -1.2rem;
        }
    }

    .catalog-switches-sort{
        display: flex;
        gap: .4rem;
        flex-wrap: wrap;
        @include font-14;

        @media (max-width: $navigation-mobile) {
            height: 2.4rem;
            align-items: center;
        }
        
        &__caller{
            position: relative;
        }

        &__caller-trigger{
            display: flex;
            align-items: center;
            gap: .4rem;
            cursor: pointer;
        }

        &__drop{
            position: absolute;
            top: calc(100% + .6rem);
            left: 1.5rem;
            background: var(--white);
            border-radius: .8rem;
            padding: .4rem 0;
            overflow: hidden;
            width: max-content;
        }

        &__drop-item{
            padding: .2rem .8rem;
            cursor: pointer;

            @media (hover: hover){
                &:hover{
                    background: var(--gray-20);
                }
            }
        }

        &__direction{
            margin-right: .4rem;

            &--asc{
                transform: rotate(.25turn);
            }

            &--desc{
                transform: rotate(-.25turn) scaleY(-1);
            }
        }
    }

    .catalog-switches-total{
        @include font-14;
        color: var(--black-40);
        
        span{
            @include font-h7
        }
    }

    .catalog-switches-view{
        display: flex;

        .catalog-switches-view__item{
            padding: .4rem;

            &:not(&--active){
                color: var(--black-40);
            }
        }
    }

    @include mob-display($navigation-mobile);
</style>