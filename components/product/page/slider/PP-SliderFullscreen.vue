<template>
    <ModalWireframe
        close-outside
        unique-class="slider-fullscreen"
        :teleport="false"

        ref="wireframeRef"
    >
        <div 
            class="pp-slider-fullscreen"
            :class="{'pp-slider-fullscreen--called': wireframeRef?.called}"
        >
            <PP-Slider class="pp-slider" :="{info, direction}" fullscreen ref="sliderRef"/>
        </div>   
    </ModalWireframe>
</template>

<script setup>
    const props = defineProps({
        info: Object,
        slider: Object,
        direction: {
            type: String,
            default: "vertical",
        },
    });

//ref
    const sliderRef = ref();

//call
    const wireframeRef = ref();

    const call = (id)=>{
        wireframeRef.value?.call();
        setTimeout(() => {
            sliderRef.value?.slideTo(id, 0);
        });
    };
    const close = ()=>{wireframeRef.value?.close()};

    defineExpose({
        call,
        close
    })
</script>

<style lang="scss">
    .slider-fullscreen{
        .modal-wireframe__wrapper{
            height: 100%;
        }

        .modal-wireframe__container{
            width: 100%;
            height: 100%;
        }

        .close{
            transform: translate(104%, -82%);

            @media (max-width: $mobile){
                transform: translate(50%, -50%);   
            }
        }

        .pp-slider-fullscreen{
            position: relative;
            z-index: 1;
            height: 100%;

            &:not(&--called){
                @include hidden(0);
            }

            .pp-slider{
                height: 100%;
                max-width: unset;
                user-select: none;

                &__thumbs{
                    height: 100%;
                    flex-shrink: 0;

                    &::before,
                    &::after{
                        opacity: 0;
                    }
                }

                &__slider-wrapper{
                    width: 100%;
                }

                &__slider{
                    width: 100%;
                    height: 100%;
                    max-width: unset;

                    .image{
                        height: 100%;
                        
                        &__container{
                            padding-bottom: 0!important;
                        }
                    }
                }
            }
        }
    }
</style>