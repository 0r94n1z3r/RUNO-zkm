<template>
    <div 
        class="slider-arrows" 
        @mouseleave="mouseleaveHandler"
        :style="{'--shift': `${shift}`}"
        v-if="swiper"
    >
        <Button 
            class="slider-arrow slider-arrow--prev" 
            :class="{'slider-arrow--hidden': swiper.isLocked || (swiper.isBeginning && !swiper.loopedSlides)}"
            type="secondary"
            icon-left="chevron-left"
            @click="clickHandler(swiper.slidePrev())"
        />
        <Button 
            class="slider-arrow slider-arrow--next" 
            :class="{'slider-arrow--hidden': swiper.isLocked || (swiper.isEnd && !swiper.loopedSlides)}"
            type="secondary"
            icon-left="chevron-right"
            @click="clickHandler(swiper.slideNext())"
        />
    </div>
</template>

<script setup>
    const props = defineProps({
        swiper: Object,
        shift: {
            type: String,
            default: '0'
        }
    })

    // const emit = defineEmits(['prev', 'next'])

    const clickHandler = (cb=()=>{})=>{
        window.getSelection().removeAllRanges();
        document.documentElement.style['user-select'] = 'none';
        cb();
    }

    const mouseleaveHandler = ()=>{
        document.documentElement.style['user-select'] = null;
    }
</script>

<style lang="scss" scoped>
    .slider-arrows{
        --shift: 0;
    }

    .slider-arrow{
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto;
        z-index: 8;
        height: min-content;
        padding: 0.7rem !important;
        box-shadow: 0 2px 20px 0 rgba(29, 34, 45, 0.1);
        transition: .3s;

        &--prev{
            left: var(--shift);
        }
        
        &--next{
            right: var(--shift);
        }

        @media (max-width: $mobile){
            padding: 0.1rem !important;
            --shift: calc(0.5 * var(--pad)) !important;
        }

        &--hidden{
            &.slider-arrow{
                &--prev{
                    @include hidden-hor(-1rem);
                }
                
                &--next{
                    @include hidden-hor(1rem);
                }
            }
        }
    }
</style>