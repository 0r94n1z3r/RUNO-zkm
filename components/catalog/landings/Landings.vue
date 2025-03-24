<template>
    <div class="landings content-wrapper" v-if="false">
        <!-- notdone -->
        <div class="landings__container">
            <NuxtErrorBoundary @error="() => {}">
            <Swiper
                class="swiper--faded"
                slides-per-view="auto"
                lazy
                @swiper="initSwiper"
            >
                <SwiperSlide v-for="(i,k) in [1,2,3,4,5]" style="width: max-content">
                    <div class="landings__card-wr">
                        <Card 
                            class="landing-card"
                            to="#"
                        >
                            <Image
                                class="landing-card__image"
                                src="/tmp/cat.png"
                                :ratio="1"
                            />
                            <div class="landing-card__title">
                                <p>Гидроцилиндры для грейферов</p>
                            </div>
                        </Card>
                    </div>
                </SwiperSlide>
            </Swiper>
            <!-- <SliderArrows
                :="{swiper}"
            /> -->
            </NuxtErrorBoundary>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        category: Object,
    })

    
    const swiper = ref();
    const initSwiper = (sw)=>swiper.value = sw;

    
</script>

<style lang="scss" scoped>
    .landings{
        --gap: 3rem;

        &__container{
            position: relative;

            width: calc(100% + var(--gap));
            margin-left: calc(-0.5 * var(--gap));

            @media (max-width: $mobile){
                --gap: .8rem;
            }
        }

        &__card-wr{
            padding: 0 calc(var(--gap) / 2);
        }
    }

    .landing-card{
        width: 27rem;
        padding: .6rem;
        display: flex;
        align-items: center;
        gap: .8rem;

        &__image{
            width: 8rem
        }

        @media (max-width: $mobile){
            flex-direction: column;
            width: 16rem;
            @include font-14;
            text-align: center;

            &__title{
                width: 80%;
            }
        }
    }
</style>