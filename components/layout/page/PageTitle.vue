<template>
    <h1 class="page-title content-wrapper">
        {{title}}
    </h1>
</template>

<script setup>
    const props = defineProps({
        title: String
    })
</script>

<style lang="scss" scoped>
    .page-title{
        --mb: 6rem;
        --m-mb: 4rem;

        margin-bottom: var(--mb);

        @media (max-width: $mobile) {
            margin-bottom: var(--m-mb);

            @include font-h3;
        }
    }
</style>