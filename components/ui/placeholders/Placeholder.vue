<template>
    <Component class="placeholder" :is="component"/>
</template>

<script setup>
    import PlaceholderBar from "./PlaceholderBar.vue"
    import PlaceholderBlock from "./PlaceholderBlock.vue"
    import PlaceholderCircle from "./PlaceholderCircle.vue"
    import PlaceholderLog from "./PlaceholderLog.vue"

    const props = defineProps({
        type: {
            type: String,
            default: "bar"
        }
    })

    const component = computed(()=>{
        switch (props.type) {
            case "bar": return PlaceholderBar
            case "block": return PlaceholderBlock
            case "circle": return PlaceholderCircle
            case "log": return PlaceholderLog
        }
    })
</script>

<style lang="scss" scoped>
    .placeholder{
        color: var(--white);
        background: var(--gray-40);
        animation: breathe .6s infinite alternate;
    }
</style>