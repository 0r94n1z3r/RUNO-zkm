<template>
    <div class="prod-card-title">
        <h5 class="prod-card-title__title">{{ info.title }}</h5>
    </div>
</template>

<script setup>
    const props = defineProps({
        info: Object 
    })
</script>

<style lang="scss" scoped>
    .prod-card-title{
        --lines: 2;
        color: var(--black-100);

        @include multiple-text-overflow(var(--lines));

        h5{
            min-height: calc(var(--lines) * 1lh);
        }

        @media (max-width: $mobile) {
            --lines: 3;
            
            h5{
                @include font-h7;
            }
        }
    }
</style>