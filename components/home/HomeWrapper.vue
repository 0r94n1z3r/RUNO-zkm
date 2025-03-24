<template>
    <div 
        class="home-wrapper content-wrapper"
    >
        <h2 v-if="title">{{ title }}</h2>
        <slot/>
    </div>
</template>

<script setup>
    const props = defineProps({
        title: String,
    })
</script>

<style lang="scss" scoped>
    .home-wrapper{
        --mb: 10rem;
        --m-mb: 6rem;

        margin-bottom: var(--mb);

        h2{
            margin-bottom: 4rem;
        }

        @media (max-width: $mobile) {
            margin-bottom: var(--m-mb);

            h2{
                @include font-h4;
                margin-bottom: 2.4rem;
            }
        }

    }
</style>