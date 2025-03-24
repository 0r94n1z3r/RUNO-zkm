<template>
    <div 
        class="pp-slider"
        :class="[`pp-slider--${direction}`]"
    >
        <div class="pp-slider__slider-wrapper">
            <PP-ThumbsSlider
                v-if="hasImages"
                :="{
                    info,
                    fullscreen,
                    swiper,
                    slide,
                    direction
                }"
                @swiper="initThumbsSlider"
            />
            <NuxtErrorBoundary @error="() => {}">
                <Swiper
                    class="pp-slider__slider"

                    :space-between="30"
        
                    @swiper="initSwiper"
                    @activeIndexChange="slide = $event.realIndex"
        
                    loop
                    lazy
        
                    :modules="[SwiperThumbs, SwiperKeyboard, SwiperZoom]"
                    :thumbs="{ swiper: thumbsSlider }"
                    :keyboard="{enabled: fullscreen}"
                    :zoom="true"

                    @click="hasImages && emit('fullscreen', slide)"

                    :style="{cursor: fullscreen?'auto':'pointer'}"
                >
                    <SwiperSlide v-for="i in images">
                        <div class="pp-slider__slide swiper-zoom-container">
                            <Image :src="i.url" :ratio="1" :size="fullscreen?null:400"/>
                        </div>
                    </SwiperSlide>
                    <div
                        v-if="hasImages && !fullscreen"
                        class="pp-slider__zoom"
                        @click="emit('fullscreen', slide)"
                    >
                        <Button 
                            icon-left="plus"
                        />
                    </div>
                </Swiper>
            </NuxtErrorBoundary>
        </div>
        <SliderArrows
            v-if="fullscreen && images?.length > 1"
            :="{swiper}"
            shift="-1.2em"
        />
    </div>
</template>

<script setup>
    const props = defineProps({
        info: Object,
        fullscreen: Boolean,
        direction: {
            type: String,
            default: "vertical",
        },
    })

    const emit = defineEmits(['fullscreen']);

    const swiper = ref();
    const thumbsSlider = ref();

    const initSwiper = sw => swiper.value = sw;
    const initThumbsSlider = sw => thumbsSlider.value = sw;

    const slide = ref(0);

    defineExpose({
        slideTo(id, speed){swiper.value?.slideTo(id, speed)}
    })

//images
    const hasImages = computed(()=>props.info?.images?.length)
    const images = computed(()=>hasImages.value?props.info?.images:[{url: '/no-photo.jpg'}])
</script>

<style lang="scss" scoped>
    .pp-slider{
        display: flex;
        gap: 3rem;
        position: relative;
        width: fit-content;
        flex-shrink: 0;
        width: fit-content;

        &__slider-wrapper{
            display: flex;
            align-items: start;
            gap: 3rem;
            width: 100%;
        }

        &__slider{
            width: 37rem;
            min-width: 0;
            margin: 0;
            position: relative;
            border-radius: .8rem;
            background: var(--white);
        }

        &__zoom{
            position: absolute;
            @include all-directions(0);
            margin: auto;
            @include flex-col;
            width: max-content;
            height: max-content;
            z-index: 1;
            transition: .3s;
            padding: 2rem;
        }

        @media (hover: hover){
            &__slider{
                &:not(:hover){
                    .pp-slider{
                        &__zoom{
                            @include hidden(0);
                        }
                    }
                }
            }

            &__zoom{
                &:hover{
                    transform: scale(1.1);
                }
            }
        }

        @media (hover: none){
            .pp-slider__zoom{
                display: none;
            }
        }

        &__slide{
            width: 100%;
            height: 100%;

            .image{
                display: block;
                width: 100%;
                object-fit: contain;
            }
        }

        &__youtube{
            position: absolute;
            z-index: 2;
            right: 0;
            top: 0;
        }

        .slider-button{
            position: absolute;
            z-index: 2;
            position: absolute;
            right: 0;
            left: 0;
            margin: 0 auto;
            height: fit-content;
            width: fit-content;
            transition: .3s;

            &--top{
                top: 1rem;
            }

            &--bottom{
                bottom: 1rem;
            }

            &--hidden{
                @include hidden(0);
            }

            &--main{
                top: 0;
                bottom: 0;
                left: unset;
                right: unset;
                margin: auto;
            }

            &--prev{
                left: 1rem;
            }

            &--next{
                right: 1rem;
            }
        }

        .prod-card-photo{
            width: 100%;
        }
        
        .pp-slider__mob-slider-wrapper{
            width: 100%;
        }

        @include mob-display(610px);

        &--horizontal{
            width: 100%;
            max-width: unset;

            .pp-slider{
                &__slider{
                    margin: 0 auto;
                }

                &__slider-wrapper{
                    flex-direction: column-reverse;
                }
            }
        }

        .swiper{
            overflow: hidden;
        }
    }
</style>