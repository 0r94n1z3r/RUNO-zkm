<template>
    <div 
        class="tooltip"
        :class="{'tooltip--inline': inline}"
    >
        <Icon :name="icon" :size="size"/>
        <div class="tooltip__box">
            <p>{{ text }}</p>
        </div>
    </div>
    
</template>

<script setup>
    const props = defineProps({
        text: String,
        icon: {
            type: String,
            default: 'help-circle'
        },
        size: {
            type: [Number, String],
            default: 20
        },
        inline: Boolean
    })
</script>

<style lang="scss" scoped>
    .tooltip{
        &--inline{
            display: inline-block;
        }

        &:not(:hover){
            .tooltip__box{
                @include hidden(1rem);
            }
        }


        &__box{
            position: absolute;
            background: var(--black-60);
            padding: 1.2rem;
            border-radius: .4rem;
            color: var(--white);
            bottom: calc(100% - .4rem);
            right: 0;
            width: fit-content;
            max-width: 100%;
            z-index: 2;
            pointer-events: none;
            transition: .3s;
        }
    }
</style>