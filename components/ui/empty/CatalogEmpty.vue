<template>
    <div class="catalog-empty">
        <h5 v-if="title">{{ title }}</h5>
        <p v-if="text" class="font-14">{{ text }}</p>
        <slot/>
    </div>
</template>

<script setup>
    const props = defineProps({
        title: {
            type: String,
            default: 'По данному критерию товары не найдены',
        },
        text: String,
    })
</script>

<style lang="scss" scoped>
    .catalog-empty{
        @include flex-col;
        gap: 1.6rem;

        width: 100%;
        padding: 1.6rem;
        border-radius: .8rem;
        background: var(--orange-5);
    }
</style>