<template>
    <div v-if="info?.description" class="pp-description" id="product-description">
        <h2>Описание товара</h2>
        <ParsedHTML :html="info?.description"/>
    </div>
</template>

<script setup>
    const props = defineProps({
        info: Object
    })
</script>

<style lang="scss" scoped>
    h2{
        margin-bottom: 2.4rem;

        @media (max-width: $mobile) {
            @include font-h3;
        }
    }
</style>