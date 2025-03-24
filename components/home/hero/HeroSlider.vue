<template>
    <div class="hero-slider">
        <div class="hero-slider__container">
            <img 
                class="hero-slider__background" 
                src="/images/hero/hero-gradient.png"
                alt=""
            />
            <NuxtErrorBoundary @error="() => {}">
                <Swiper
                    class="swiper--faded"
                    slides-per-view="1"
                    lazy
                    loop
                    @swiper="initSwiper"
                    :modules="[SwiperPagination, SwiperAutoplay]"
                    :pagination="{
                        dynamicBullets: true,
                        clickable: true
                    }"
                    :autoplay="{
                        delay: 5000,
                    }"
                >
                    <SwiperSlide v-for="i in slides">
                        <div class="hero-slide">
                            <div class="hero-slide__content-wr">
                                <div class="hero-slide__content">
                                    <p class="hero-slide__title font-h1">{{ i.title }}</p>
                                    <div class="hero-slide__tags" v-if="i.second_level_title && i.second_level_title != 'null'">
                                        <h6 class="hero-slide__tag">{{ i.second_level_title }}</h6>
                                    </div>
                                    <p class="hero-slide__text">{{ i.description }}</p>
                                    <Button v-if="i.url" :to="i.url">{{ i.button_text || 'Перейти в каталог' }}</Button>
                                </div>
                                <img
                                    class="hero-slide__image"
                                    :src="srcDisplay(i.image_url)"
                                    alt=""
                                />
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </NuxtErrorBoundary>
            <SliderArrows
                :="{swiper}"
            />
        </div>
    </div>
</template>

<script setup>
//
    const {data: slides} = useAPI(
        `/slider/slides/1`,
        {
            server: false,
            transform(data){return data.slides.filter(e => e.publish)},
            default:()=>[{}]
        }
    );

//swiper
    const swiper = ref();
    const initSwiper = (sw) => swiper.value = sw;

//
    const srcDisplay = (src)=>{
        if(!process.dev)return src;
        return src?.replace('/api', useRuntimeConfig().public.baseURL) || '';
    }
</script>

<style lang="scss" scoped>
    .hero-slider{
        margin-top: -2.2rem;
        margin-bottom: 8rem;
        // background: #f4f4f4;

        &__container{
            max-width: 128rem;
            margin: 0 auto;
            position: relative;
        }

        &__background{
            position: absolute;
            @include directions(unset,0,0,0);
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        :deep(.slider-arrow){
            padding: 1.3rem!important;

            &.slider-arrow{
                &--prev{
                    left: -2.6rem;
                }
                &--next{
                    right: -2.6rem;
                }

                @media (max-width: 1300px){
                    &--prev{
                        .icon{
                            transform: translateX(40%)
                        }
                    }

                    &--next{
                        .icon{
                            transform: translateX(-40%)
                        }
                    }
                }
            }
        }  
    }

    .hero-slide{
        position: relative;
        padding: 3.6rem var(--pad) 4.7rem;

        &__content-wr{
            display: flex;
        }

        &__content{
            @include flex-col;
            height: 100%;
            width: 100%;
            gap: 3rem;
            position: relative;
            z-index: 1;
            max-width: 50%;
        }

        &__title{
            width: 120%;
        }

        &__tags{
            display: flex;
            flex-wrap: wrap;
            gap: 1.2rem 3rem;
            color: var(--orange-100);
        }

        &__image{
            display: block;
            width: 55%;
            height: 43rem;
            margin-top: -2%;
            margin-bottom: -2%;
            object-fit: contain;
            position: relative;
            align-self: flex-end;
        } 
    }

    @media (max-width: $navigation-mobile){
        .hero-slide{
            @include padding-y(.8rem);
            padding-bottom: 5.2rem;

            &__content-wr{
                flex-direction: column-reverse;
                gap: .8rem;
            }

            &__image{
                width: 100%;
                height: 100%;
                max-height: 40rem;
                margin: 0;
                align-self: center;
            }

            &__content{
                gap: 2rem;
                max-width: unset;

                .button{
                    width: 100%;
                }
            }

            &__title{
                width: 100%;
                @include font-h2;
            }
        }

        .slider-arrows{
            display: none;
        }
    }

    @media (max-width: $mobile){
        .hero-slider{
            margin-bottom: 6rem;
        }

        .hero-slide{
            &__content{
                .button{
                    @include font-14;
                }
            }

            &__title{
                @include font-h3;
            }

            &__tag{
                @include font-h7;
            }

            &__text{
                @include font-14;
            }
        }
    }

</style>