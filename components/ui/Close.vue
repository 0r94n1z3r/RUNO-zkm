<template>
    <div class="close" :style="{margin: -(3 - Number(size)/10) / 2 + 'rem'}">
        <Icon class="close__icon" name="x" :size="size"/>
    </div>
</template>

<script setup>
    const props = defineProps({
        size: {
            type: [String, Number],
            default: 24
        }
    })
</script>

<style lang="scss" scoped>
    .close{
        color: var(--black-40);
        transition: .3s;
        cursor: pointer;
        width: 3rem;
        height: 3rem;
        flex-shrink: 0;
        margin: -0.3rem;
        @include flex-c;

        @media (hover: hover) {
            &:hover{
                color: var(--black-100);
            }
        }
    }
</style>