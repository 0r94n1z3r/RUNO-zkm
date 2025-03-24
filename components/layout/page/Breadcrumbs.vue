<template>
    <div class="breadcrumbs content-wrapper">
        <NuxtErrorBoundary @error="() => {}">
            <Swiper
                free-mode
                slides-per-view="auto"
                lazy
                @swiper="initSwiper"
            >
                <SwiperSlide 
                    v-for="(i) in breadcrumbs.slice(0, -1)"
                    :key="i?.id || Math.random()"
                    style="width: max-content"
                    class="breadcrumb"
                >
                    <Placeholder v-if="i.loading" type="bar" />
                    <HistoryNuxtLink v-else class="text-link text-link--rev" :to="i.href">
                        {{ i.title }}
                    </HistoryNuxtLink>
                    <Icon class="breadcrumb__point" name="pag-arrow" size="13"/>
                </SwiperSlide>
                <SwiperSlide class="breadcrumb breadcrumb--current" :key="Math.random()">
                    <Placeholder v-if="breadcrumbs[breadcrumbs.length-1].loading" type="bar" />
                    <p v-else>{{ breadcrumbs[breadcrumbs.length-1]?.title }}</p>
                </SwiperSlide>
            </Swiper>
        </NuxtErrorBoundary>
    </div>
</template>

<script setup>

    const props = defineProps({
        id: [String, Number], // id или [keyName] категории
        keyName: String,
        list: Array, // {href: [String, Object], title: String} // список, если breadcrumbs не относятся к каталогу
        loading: Boolean
    })

    const breadcrumbs = computed(()=>
        [
            {href: '/', title: 'Главная'},
            ...props.list 
        ]
    )


// swiper
    const swiper = ref();

    const initSwiper = (sw)=>{
        swiper.value = sw;
    }

    watch(
        breadcrumbs, 
        (n)=>{
            setTimeout(()=>{
                swiper.value?.slideTo(n.length - 1);
            })
        },
        {
            immediate: true,
            deep: true
        }
    )
</script>

<style lang="scss" scoped>
    .breadcrumbs{
        margin-bottom: 2.4rem;
        height: 2.2rem;
    }

    .breadcrumb{
        display: flex;
        gap: 1.4rem;
        align-items: center;
        min-height: 2.2rem;
        @include font-14;
        width: min-content;
        white-space: nowrap;
        padding: .2rem 0;

        &:not(:first-child){
            padding-left: 1.4rem;
        }
    }
</style>