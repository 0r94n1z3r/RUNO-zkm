<template>
    <ModalWireframe
        :="{...$attrs, ...props}"
        @call="emit('call', $event)"
        @close="emit('close', $event)"
        ref="wireframeRef"
    >
        <div class="spacer"></div>
        <div
            :class="[
                'modal',
                `${wireframeRef?.called && 'modal--called' || ''}`,
                `modal-call--${callType}`,
            ]"
        >
            <div class="modal__close-container" v-if="closeNative && !closeOutside">
                <div class="close-bar" @click="wireframeRef.closeHandler()">
                    <div class="close-bar__bar"></div>
                    <!-- notdone норм свайп сделать -->
                </div>
                <Close @click="wireframeRef.closeHandler()"/>
            </div>
            <slot/>
        </div>
    </ModalWireframe>
</template>

<script setup>
    const props = defineProps({
        callType: { // vertical / horizontal
            type: String,
            default: "vertical"
        },
        closeOutside: Boolean,
        closeNative: {
            type: Boolean,
            default: true
        }
    })

    const emit = defineEmits(['close', 'call'])

    const wireframeRef = ref();

    const call = (...options)=>{wireframeRef.value?.call(...options)};
    const close = (...options)=>{wireframeRef.value?.close(...options)};

    defineExpose({
        call,
        close
    })
</script>

<style lang="scss" scoped>
    .spacer{
        height: calc(50 * var(--vh) - 10vmin);   
    }

    .modal{
        background: var(--white);
        padding: .8rem 2.4rem;
        padding-bottom: 0;
        border-radius: .8rem .8rem 0 0;
        z-index: 1;
        transition: .3s;
        pointer-events: all;

        position: relative;

        min-height: calc(50 * var(--vh));

        --w: calc(100vw - 10vmin);
        --mx-w: $mobile;

        width: var(--w);
        max-width: var(--mx-w);

        &__close-container{
            display: flex;
            justify-content: flex-end;
            margin-bottom: .8rem;
            position: relative;
        }

        .close-bar{
            @include virtual-area(.4rem);
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            margin-left: auto;
            margin-right: auto;
            width: max-content;
            cursor: pointer;

            &__bar{
                background: var(--black-40);
                width: 4.8rem;
                height: .1rem;
                transition: .3s;
            }

            @media (hover: hover) {
                &:hover{
                    .close-bar__bar{
                        background: var(--black-100);
                    }
                }
            }
        }

        &:not(&--called){
            pointer-events: none;
            :deep(*){
                pointer-events: none !important;
            }
        }

        &.modal-call--horizontal:not(.modal--called){
            @include hidden-hor(-1rem);
        }

        &.modal-call--vertical:not(.modal--called){
            @include hidden(1rem);
        }

        &::after{
            @include pseudo-absolute;
            width: 100%;
            height: 5vmin;
            left: 0;
            right: 0;
            top: 100%;
            background: var(--white);
        }
    }
</style>