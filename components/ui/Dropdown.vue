<template>
    <Card 
        class="dropdown" 
        :class="{'dropdown--called': called}"
        :hov="false"
    >
        <div class="dropdown__title" v-if="!noTitle">
            <slot name="title"/>
            <Close @click="close"/>
        </div>
        <slot/>
    </Card>
</template>

<script setup>
    const props = defineProps({
        noTitle: Boolean,
    })

    const called = ref(false);

    const call = ()=>{
        called.value = true;
    }

    const close = ()=>{
        called.value = false;
    }

    const switchCall = ()=>{
        called.value = !called.value;
    }

    defineExpose({
        called,
        call,
        close,
        switchCall
    })
</script>

<style lang="scss" scoped>
    .dropdown{
        transition: .3s;
        z-index: 1000;
        --hide: -1rem;

        &__title{
            display: flex;
            align-items: flex-start;
            gap: 1.8rem;
        }

        &:not(&--called){
            @include hidden(var(--hide))
        }
    }
</style>