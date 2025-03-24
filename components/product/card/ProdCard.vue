<template>
    <Component
        class="prod-card" 
        :is="component"
        :="{...$attrs, info}"
        :key="info?.id || Math.random()"
    />
</template>

<script setup>
    import { 
        ProdCardNormal, 
        ProdCardCompact, 
        ProdCardHorizontal, 
    } from '#components'

    const props = defineProps({
        info: Object,
        type: {
            type: String, // normal / horizontal / compact
            default: 'normal'
        }
    })
    
    const component = computed(()=>{
        switch (props.type){
            case 'compact':
                return ProdCardCompact
            case 'horizontal':
                return ProdCardHorizontal
            default:
                return ProdCardNormal
        }
    })
</script>

<style lang="scss" scoped>
    .prod-card{
        :deep(.prod-card-prop){
            --attr-background: var(--white);
            
            .prod-card-prop__value:not(.text-link){
                color: var(--black-100)!important;
            }
        }
    }
</style>