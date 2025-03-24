<template>
    <TeleportWrapper :="{teleport}">
        <div 
            :class="[
                'modal-wireframe',
                `${called && 'modal-wireframe--called' || ''}`,
                uniqueClass
            ]"
            ref="modalWireframeRef"
        >
            <div class="modal-wireframe__blackout" @mousedown.self="closeHandler"></div>
            <div class="modal-wireframe__wrapper">
                <div class="modal-wireframe__container" v-if="displayed">
                    <slot/>
                </div>
            </div>
            <Close v-if="closeNative && closeOutside" class="modal-wireframe__close-outside" @click="closeHandler"/>
        </div>
    </TeleportWrapper>
</template>

<script setup>
    const props = defineProps({
        closeNative: {
            type: Boolean,
            default: true
        },
        callType: { // vertical / horizontal
            type: String,
            default: "vertical"
        },
        closeOutside: Boolean,
        uniqueClass: String,
        teleport: {
            type: Boolean,
            default: true
        }
    })

    const modalWireframeRef = ref();

    const emit = defineEmits(['close', 'call']);
 
//call
    const called = ref(false);

    const call = (...options)=>{
        if(!useModals().activeModalsCount){
            let body = document.documentElement;
            let oldWidth = body.clientWidth+'px';
    
            body.style.overflow = "hidden";
            modalWireframeRef.value.style.overflow = null;

            body.style.setProperty('--content-width', oldWidth);
        }

        useModals().activeModalsCount++;

        called.value = true;

        emit('call', ...options);
    }

    const closeHandler = (...options)=>{
        emit('close', ...options);
        if(props.closeNative)close();
    }

    const close = ()=>{
        called.value = false;
        useModals().activeModalsCount--;

        setTimeout(()=>{
            if(!useModals().activeModalsCount){
                let body = document.documentElement;
                body.style.overflow = null;
                modalWireframeRef.value.style.overflow = 'hidden';
        
                body.style.setProperty('--content-width', null);
            }
    
        }, 301)
    }

//displayed
    const displayed = ref(called.value);
    watch(called, async (n)=>{
        if(!n)await new Promise((r) => setTimeout(r,301));
        displayed.value = n;
    })

//resize
    const { width: windowWidth, height: windowHeight } = useWindowSize();
    let allowResize = true;
    watch(()=>[windowWidth.value, windowHeight.value], ()=>{
        if(!called.value || !allowResize)return;
        allowResize = false;
        closeHandler();
        setTimeout(()=> allowResize = true , 301);
    });

//expose
    defineExpose({
        call,
        close,
        closeHandler,
        called
    });
</script>

<style lang="scss" scoped>
    .modal-wireframe{
        z-index: 1000;
        position: fixed;
        @include all-directions(0);
        // transition: .3s;
        padding-right: calc(100% - var(--content-width));
        width: 100vw;
        height: calc(100 * var(--vh));
        overflow-y: auto;

        &__blackout{
            background: var(--black-transparent);
            position: fixed;
            @include all-directions(0);
            transition: .3s;
        }

        &__wrapper{
            min-height: calc(100 * var(--vh));
            pointer-events: none;
            @include flex-c;
            padding: 5vmin;
            position: relative;
            z-index: 1;
        }

        &__container{
            pointer-events: all;
        }

        &__close-outside{
            position: absolute;
            right: 4rem;
            right: calc(4rem + 100% - var(--content-width));
            top: 4rem;
            z-index: 1;
        }

        &:not(&--called){
            pointer-events: none;
            :deep(*){
                pointer-events: none !important;
            }

            opacity: 0;
            transition: 0s;
            transition-delay: .3s;

            .modal-wireframe{
                &__blackout,
                &__close-outside{
                    @include hidden(0);
                }
            }
        }

        &.modal-wireframe-call--horizontal:not(.modal-wireframe--called){
            .modal-wireframe{
                &__container{
                    @include hidden-hor(-1rem);
                }
            }
        }

        &.modal-wireframe-call--vertical:not(.modal-wireframe--called){
            .modal-wireframe{
                &__container{
                    @include hidden(1rem);
                }
            }
        }
    }
</style>