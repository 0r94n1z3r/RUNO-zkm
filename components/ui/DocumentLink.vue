<template>
    <NuxtLink 
        class="document-link text-link--basic"
        :to="url"
        target="_blank"
    >
        <Icon name="download" size="16"/>
        <p>{{ title }}</p>
    </NuxtLink>
</template>

<script setup>
    const props = defineProps({
        url: String,
        title: String,
    })
</script>

<style lang="scss" scoped>
    .document-link{
        display: flex;
        gap: .8rem;
        @include font-14;
    }
</style>