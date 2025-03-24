<template>
    <div 
        class="order-status"
        :style="{
            '--color': stat?.color,
            '--alt-color': stat?.['alt-color'] || stat?.color
        }"
    >
        {{ stat?.title }}
    </div>
</template>

<script setup>
    const props = defineProps({
        info: Object
    })

    const stat = computed(()=>
        useStatic().getOrderStatus(props.info.status_id || 1)
    )
</script>

<style lang="scss" scoped>
    .order-status{
        padding: .3rem .5rem;
        border-radius: .3rem;
        line-height: 1.2rem;
        font-size: 1.2rem;
        border: 1px solid var(--green-60);
        color: var(--green-100);
    }
</style>