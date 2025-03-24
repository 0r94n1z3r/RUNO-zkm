<template>
    <div class="navigation">
        <NuxtLink  
            v-for="i in itemsDisplay"
            class="navigation-item text-link--basic" 
            :class="{'navigation-item--active': i.active || (itemsDisplay.every(e => !e.active) && R().meta.nav?.toLowerCase() == i.name?.toLowerCase())}"
            :to="i.to"
            @click="i.click"
        >
            <div class="navigation-item__icon-wr">
                <Icon 
                    class="navigation-item__icon"
                    :name="i.icon"
                    :size="i['icon-size'] || 18"
                />
                <div class="navigation-item__count" v-if="i.count">
                    {{ i.count }}
                </div>
            </div>
            <div class="navigation-item-title">
                <p class="navigation-item-title__text">
                    {{ i.title }}
                </p>
            </div>
        </NuxtLink>
    </div>
</template>

<script setup>
    const props = defineProps({
        list: {
            type: Array,
            default: ['favorites', 'user', 'cart']
        }
    })

    const itemsList = computed(()=>[
        {
            name: 'favorites',
            icon: 'fav',
            title: 'Избранное',
            count: useFavorites().list.length || null,
            to: '/user/favorites',
        },
        {
            name: 'user',
            icon: 'user',
            title: `Профиль`,
            to: '/user',
        },
        {
            name: 'cart',
            icon: 'shopping-cart',
            title: 'Корзина',
            to: '/cart',
            count: useCart().length || null,
        },
        {
            name: 'catalog',
            icon: useCategories().called?'x':'menu',
            title: 'Каталог',
            click(){
                useCategories().called = !useCategories().called;
                window.scrollTo(0, 0);
            },
            active: useCategories().called,
            'icon-size': 16
        },
        {
            name: 'home',
            icon: 'home',
            title: 'Главная',
            to: '/',
            'icon-size': 16
        },
    ])

    const itemsDisplay = computed(()=>props.list.map(e => itemsList.value.find(j => j.name == e)))

</script>

<style lang="scss" scoped>
    .navigation{
        display: flex;
        flex-shrink: 0;
        gap: .8rem;

        .navigation-item{
            @include flex-col;
            align-items: center;
            gap: .4rem;
            width: 3.8rem;
            height: 3.8rem;
            @include flex-c;
            position: relative;

            &__icon-wr{
                position: relative;
            }

            &__count{
                position: absolute;
                top: 0;
                right: 0;
                font-size: 1.1rem;
                font-weight: 500;
                line-height: 1.7rem;
                background: var(--orange-100);
                color: var(--white);
                padding: .2rem .2rem .1rem;
                min-width: 2rem;
                @include flex-c;
                border-radius: 1rem;
                transform: translate(45%, -50%);
                width: max-content;
                
            }

            @media(hover: hover){
                &:hover{
                    .navigation-item__title{
                        opacity: 1;
                    }
                }
            }

            .icon{
                --icon-size: 2.4rem;
            }

            &--active{
                color: var(--orange-100);

                .navigation-item__title{
                    opacity: 1;
                }
            }

            @media (hover: hover) {
                &:not(:hover){
                    .navigation-item-title__text{
                        @include hidden(-1rem);
                    }
                }
            }
        }

        .navigation-item-title{
            @include font-14;
            font-weight: 500;
            position: absolute;
            pointer-events: none;
            left: 50%;
            top: 100%;
            white-space: nowrap;
            transform: translateX(-50%);

            @media (hover: none) {
                display: none;
            }

            @media (max-width: $navigation-mobile) {
                display: none;
            }

            &__text{
                transition: .3s;
                background: var(--black-transparent-60);
                color: var(--white);
                padding: .1rem .4rem;
                border-radius: .4rem;
            }
        }

        @media (max-width: $navigation-mobile) {
            .navigation-item{
                &__count{
                    top: -.5rem;
                }
            }
        }
    }
</style>