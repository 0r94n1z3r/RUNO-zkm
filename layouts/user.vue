<template>
    <div class="user">
        <Breadcrumbs 
            :list="[
                {title: 'Личный кабинет'},
                {title}
            ]"
        />

        <PageTitle 
            :={title}
        />

        <div class="user__content-wr content-wrapper">
            <!-- nav-desk -->
            <div class="user-nav desk-visible">
                <NuxtLink
                    v-for="i in nav" 
                    class="user-nav__item text-link--basic"
                    :class="{'user-nav__item--active': title == i.title}"
                    :to="i.to"
                >
                    <Icon :name="i.icon.name" :size="i.icon.size"/>
                    <p class="font-h6">{{ i.title }}</p>
                </NuxtLink>
                <div 
                    class="user-nav__item text-link--basic"
                    @click="useUser().exit()"
                >
                    <Icon name="log-out"/>
                    <p>Выйти</p>
                </div>
            </div>

            <div class="mob-user-nav mob-visible">
                <div class="mob-user-nav__info">
                    <h5>ID {{ useUser()?.info?.id }}</h5>
                    <div 
                        class="mob-user-nav__exit text-link--basic"
                        @click="useUser().exit()"
                    >
                        <p>Выйти</p>
                        <Icon name="log-out"/>
                    </div>
                </div>

                <NuxtErrorBoundary @error="() => {}">
                    <Swiper
                        class="mob-user-nav__items swiper--faded"
                        free-mode
                        slides-per-view="auto"
                        lazy
                        @swiper="initSwiper"
                    >
                        <SwiperSlide 
                            v-for="(i) in nav"
                            style="width: max-content"
                        >
                            <NuxtLink
                                class="mob-user-nav__item text-link--basic"
                                :class="{'mob-user-nav__item--active': title == i.title}"
                                :to="i.to"
                            >
                                <h6>{{ i.title }}</h6>
                                <p>{{ i.title }}</p>
                            </NuxtLink>
                        </SwiperSlide>
                    </Swiper>
                </NuxtErrorBoundary>
            </div>


            <div class="user-nav__content">
                <slot/>
            </div>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        title: String
    })

    const nav = ref([
        {
            title: 'Мои заказы', 
            icon: {
                name: 'box', 
                size: 24
            },
            to: '/user/orders'
        },
        {
            title: 'Избранные товары', 
            icon: {
                name: 'fav', 
                size: 18
            },
            to: '/user/favorites'
        },
        {
            title: 'Личные данные', 
            icon: {
                name: 'user', 
                size: 18
            },
            to: '/user/profile'
        },
    ]) 

    const swiper = ref();

    const initSwiper = (sw)=>{
        swiper.value = sw;

        setTimeout(()=>{
            // notdone не нравится, надо посмотреть как не обновлять layout
            swiper.value?.slideTo(nav.value.findIndex(e => props.title == e.title));
        }, 300)
    }
</script>

<style lang="scss" scoped>
    .user{
        &__content-wr{
            display: flex;
            gap: 3rem;
            align-items: start;
        }
    }

    .user-nav{
        width: 27rem;
        flex-shrink: 0;
        position: sticky;
        top: calc(var(--header-height) + 3rem);
        border-radius: .8rem;
        overflow: hidden;
        border: 1px solid var(--black-10);

        &__content{
            width: 100%;
        }

        &__item{
            --icon-size: 1.8rem;
            display: flex;
            align-items: center;
            gap: 1.6rem;
            padding: 1.6rem;
            background: var(--white);

            &--active{
                background: var(--black-5);
                color: var(--orange-100);
            }

            &:not(:last-child){
                border-bottom: 1px solid var(--black-10);
            }
        }
    }

    .mob-user-nav{
        width: 100%;

        &__info{
            @include flex-jtf;
            align-items: center;
            margin-bottom: 2.4rem;
        }

        &__exit{
            display: flex;
            align-items: center;
            gap: .4rem;
        }

        --gap: 2.4rem;

        &__items{
            margin: 0 calc(-.5 * var(--gap));
        }

        &__item{
            display: block;
            padding: .8rem calc(var(--gap) * .5);
            border-bottom: .2rem solid transparent;
            position: relative;
            line-height: 1.8rem;

            &--active{
                @include font-h6;
                border-color: var(--orange-100);
                color: var(--orange-100)
            }

            h6{
                opacity: 0;
            }

            p{
                position: absolute;
                @include all-directions(0);
                margin: auto;
                width: max-content;
                height: max-content;
            }
        }
    }

    @include mob-display(750px);

    @media (max-width: 750px) {
        .user{
            &__content-wr{
                flex-direction: column;
            }
        }
    }
</style>