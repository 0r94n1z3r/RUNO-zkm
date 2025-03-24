<template>
    <div class="partners">
        <NuxtErrorBoundary @error="() => {}">
            <Swiper
                slides-per-view="auto"
                free-mode
                lazy
                loop
                        
                @swiper="initSwiper"
                :modules="[SwiperAutoplay]"
                :autoplay="{
                    delay: 0,
                    disableOnInteraction: true,
                }"
                :speed="3000" 
            >
                <!-- -->
                <!-- :modules="[SwiperPagination]"
                :pagination="{
                    // dynamicBullets: true,
                    clickable: true
                }" -->
                <SwiperSlide v-for="(i,k) in [...list, ...list, ...list,]" style="width: max-content">
                    <NuxtLink 
                        class="partners__image-wr"
                        :to="i.to"
                    >
                        <Image
                            class="partners__image"
                            :src="i.src"
                            :ratio="170/100"
                        />
                    </NuxtLink>
                </SwiperSlide>
            </Swiper>
        </NuxtErrorBoundary>
    </div>
</template>

<script setup>

    const list = [
        {src: `/images/partners/001.png`, to: '/brands/lsq'},
        {src: `/images/partners/002.png`, to: '/brands/luen'},
        {src: `/images/partners/003.png`, to: '/brands/omt'},
        {src: `/images/partners/004.png`, to: '/brands/gidroprivod'},
        {src: `/images/partners/006.png`, to: '/brands/kgs'},

        {src: `/images/partners/018.png`, to: '/brands/zihyd'},
        {src: `/images/partners/016.png`, to: '/brands/boden'},
        {src: `/images/partners/017.png`, to: '/brands/rekith'},

        {src: `/images/partners/000.png`, to: '/brands/zhanyue'},
    ]

    const swiper = ref();
    const initSwiper = (sw)=>{
        swiper.value = sw;
    }

</script>

<style lang="scss" scoped>
    .partners{
        margin-bottom: 10rem;
        --swiper-wrapper-transition-timing-function: linear;

        &__image-wr{
            --spacer: 3rem;
            --w: 17rem;
            display: block;

            padding: 0 calc(var(--spacer) / 2);
            width: calc(var(--w) + var(--spacer));

            .image{
                width: 100%;
                transition: .3s;

                &:not(:hover){
                    opacity: .6;
                    filter: grayscale(1);    
                }
            }

            @media (max-width: $mobile) {
                --spacer: .8rem;
                --w: 10rem;
            }
        }

        // :deep(.swiper-wrapper){
        //     --swiper-wrapper-transition-timing-function: linear;
        // }
    }
</style>