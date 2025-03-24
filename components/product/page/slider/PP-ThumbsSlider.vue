<template>
    <NuxtErrorBoundary @error="() => {}">
        <Swiper
            class="pp-thumbs-slider"
            :class="[
                `pp-thumbs-slider--${direction}`,
                fullscreen && `pp-thumbs-slider--fullscreen`,
                `swiper--faded`,
                direction == 'vertical' && `swiper--faded--vertical`
            ]"
            slides-per-view="auto"
            
            @swiper="emit('swiper', $event)"
            
            watch-slides-progress
            free-mode
            lazy
            mousewheel

            :direction="direction"

            :modules="[SwiperThumbs, SwiperMousewheel, SwiperFreeMode]"    
        >
            <SwiperSlide v-for="(i,k) in info?.images" :key="k" style="width:max-content;height:max-content;">
                <div class="pp-thumbs-slider__thumb">
                    <Image :src="i.url" :ratio="1" size="76"/>
                </div>
            </SwiperSlide>
        </Swiper>
    </NuxtErrorBoundary>
</template>

<script setup>
    const props = defineProps({
        info: Object,
        fullscreen: Boolean,
        swiper: Object,
        slide: Number,
        direction: {
            type: String,
            default: 'vertical',
        }
    })

    const emit = defineEmits(['swiper']);
</script>

<style lang="scss" scoped>
    .pp-thumbs-slider{
        position: relative;
        flex-shrink: 0;

        --width: 7rem;
        --gap: 1.6rem;

        &__thumb{
            padding: calc(var(--gap)/2);
            position: relative;
            cursor: pointer;

            .image{
                display: block;
                width: var(--width);
                object-fit: contain;
                border-radius: .8rem;
                overflow: hidden;
                background: var(--white);
            }

            &::after{
                @include pseudo-absolute;
                transition: .3s;
                @include all-directions(calc(var(--gap)/2));
                border: 1px solid transparent;
                border-radius: .8rem;
            }

            @media (hover: hover) {
                &:hover{
                    &::after{
                        border-color: var(--gray-20);
                    }
                }
            }
        }

        :deep(.swiper-slide-thumb-active){
            .pp-thumbs-slider__thumb::after{
                border-color: var(--orange-100);
            }
        }

        &--horizontal{
            width: 100%;
            
            :deep(.swiper-wrapper){
                max-width: fit-content;
            }

            .slider-button{
                top: 0;
                bottom: 0;
                margin: auto 0;

                &--start{
                    left: 1rem;
                }

                &--end{
                    right: 1rem;
                }
            }
        }

        &--vertical{
            height: calc(37rem + var(--gap));
            width: calc(var(--width) + var(--gap));
            margin: calc(-1 * var(--gap)/2);

            .slider-button{
                right: 0;
                left: 0;
                margin: 0 auto;

                &--start{
                    top: 1rem;
                }

                &--end{
                    bottom: 1rem;
                }
            }
        }

        .slider-button{
            position: absolute;
            z-index: 2;
            position: absolute;
            height: fit-content;
            width: fit-content;
            transition: .3s;

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
        }

        &--fullscreen{
            &.pp-thumbs-slider--vertical{
                height: 100%;
            }

            &::before, &::after{
                opacity: 0;
            }
        }

        @media (max-width: $mobile){
            &__thumb{
                padding: .2rem;
                --w: calc(100% - .4rem);

                .image{
                    width: 6.4rem;
                }
            }

            .pp-thumbs-slider{
                &__thumb{
                    &::after{
                        @include all-directions(.2rem);
                    }
                }
            }
            
        }
                
    }
</style>