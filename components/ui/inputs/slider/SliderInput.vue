<template>
    <div class="slider-input">
        <Slider 
            v-if="isMounted"
            class="slider-input__slider" 
            v-model="model"
            :tooltips="false" 
            :lazy="false"
            :min="min" 
            :max="max"
            @end="emit('end')"
            @mouseup="emit('end')"
        ></Slider>
    </div>
</template>

<script setup>
    import Slider from '@vueform/slider';
    import '@vueform/slider/themes/default.css';

    const props = defineProps({
        min: Number,
        max: Number,
    });

    const emit = defineEmits(['end']);

    const model = defineModel() // [Number, Number] / Number

    const isMounted = ref(false);
    onMounted(()=>isMounted.value = true);
</script>

<style lang="scss" scoped>
    .slider-input{
        height: 1.6rem;
        padding-top: .8rem;

        &__slider{
            --slider-height: .2rem;
            --slider-bg: var(--black-20);
            --slider-connect-bg: var(--orange-100);

            --slider-handle-width: 1.6rem;
            --slider-handle-height: 1.6rem;

            --slider-handle-shadow: 0 0 .1rem 0 rgba(104, 111, 123, 1), 0 .1rem .1rem 0 rgba(104, 111, 123, .75);
            --slider-handle-shadow-active: 0 0 .1rem 0 rgba(104, 111, 123, 1), 0 .1rem .1rem 0 rgba(104, 111, 123, .75);

            --slider-handle-ring-width: 0;

            :deep(.slider-touch-area){
                &::after{
                    @include pseudo;
                    width: 100%;
                    height: 100%;
                    border: .2rem solid var(--orange-100);
                    border-radius: 50%;
                }
            }
        }
    }   
        
    
</style>