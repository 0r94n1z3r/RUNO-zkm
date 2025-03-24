<template>
    <ModalWireframe
        :="{...$attrs, ...props}"
        @call="(...args) => emit('call', ...args)"
        @close="(...args) => emit('close', ...args)"
        ref="wireframeRef"
    >
        <div
            :class="[
                'modal',
                `${wireframeRef?.called && 'modal--called' || ''}`,
                `modal-call--${callType}`,
            ]"
        >
            <div class="modal__close-container" v-if="closeNative && !closeOutside">
                <Close  @click="wireframeRef.closeHandler()"/>
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
    .modal{
        background: var(--white);
        padding: 4rem;
        padding-top: 1.6rem;
        border-radius: 1.2rem;
        z-index: 1;
        transition: .3s;
        pointer-events: all;

        --w: unset;
        --mx-w: unset;

        width: var(--w);
        max-width: var(--mx-w, calc(100vw - var(--pad)));

        &__close-container{
            display: flex;
            justify-content: flex-end;
            transform: translateX(2.4rem);
            margin-bottom: 0;
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
    }
</style>