<template>
    <p class="err" v-if="err">
        {{ err }}
    </p>
</template>

<script setup>
    const props = defineProps({
        err: [String, Object]
    });
</script>

<style lang="scss" scoped>
    .err{
        color: var(--red-100)
    }
</style>