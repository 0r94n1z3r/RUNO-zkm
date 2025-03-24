<template>
    <Component :is="component" class="logo" :to="to">
        <Image 
            src="/images/logo.svg"
            :ratio="69/24"
        />
    </Component>
</template>

<script setup>
    const props = defineProps({
        to: [String, Object]
    })

    const component = computed(()=>
        props.to?defineNuxtLink({}):'div'
    )
</script>

<style lang="scss" scoped>
    .logo{
        display: block;
        flex-shrink: 0;

        &__icon{
            display: block;
            width: 100%;
            height: 100%;
        }
    }
</style>