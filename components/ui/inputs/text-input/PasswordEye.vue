<template>
    <div 
        class="password-eye"
        @click="model = !model"
    >
        <Icon :name="`eye${model?'':'-off'}`" :size="size"/>
    </div>
</template>

<script setup>
    const props = defineProps({
        size: [String, Number]
    })

    const model = defineModel();
</script>

<style lang="scss" scoped>
    .password-eye{
        cursor: pointer;
        @include virtual-area(calc(var(--padding-x) / 2));
    }
</style>