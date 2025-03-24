<template>
    <div class="prods-carousel">
        <NuxtErrorBoundary @error="() => {}" v-if="mounted">
            <Swiper
                class="swiper--faded"
                slides-per-view="auto"
                lazy
                :={loop}
                @swiper="initSwiper"
            >
                <SwiperSlide v-for="(i,k) in loading?new Array(4).fill({}):list" style="width: max-content">
                    <div class="prods-carousel__card-wr">
                        <ProdCard :info="{...i, loading}" :="{type}"/>
                    </div>
                </SwiperSlide>
            </Swiper>
            <SliderArrows
                v-if="!loading"
                :="{swiper}"
            />
        </NuxtErrorBoundary>
    </div>
</template>

<script setup>
    const props = defineProps({
        list: Array,
        type: String,
        loop: {
            type: Boolean,
            default: true
        },
        loading: Boolean
    })

    const mounted = ref();
    onMounted(()=>mounted.value = true)

    const swiper = ref();

    const initSwiper = (sw) => swiper.value = sw;
</script>

<style lang="scss" scoped>
    .prods-carousel{
        --gap: 3rem;
        position: relative;

        width: calc(100% + var(--gap));
        margin-left: calc(-0.5 * var(--gap));

        &__card-wr{
            padding: 0 calc(var(--gap) / 2);
        }

        @media (max-width: $mobile){
            --gap: .8rem;
            width: 100%;
            overflow: hidden;
        }
    }
</style>