<template>
    <Component
        class="card" 
        :is="component"
        :hov="hov || null"
        :to="to"
    >
        <slot/>
    </Component>
</template>

<script setup>
    const props = defineProps({
        to: [String, Object],
        hov: {
            type: Boolean,
            default: true
        }
    })

    const component = computed(()=>
        props.to?defineNuxtLink({}):'div'
    )
</script>

<style lang="scss" scoped>
    .card{
        border: .1rem solid var(--black-10);
        background: var(--white);
        border-radius: .8rem;
        transition: .3s;
        display: block;

        @media (hover: hover){
            &[hov]{
                &:hover{
                    color: var(--orange-100);
                    border-color: var(--orange-100);
                    box-shadow: 0 0 1rem 0 rgba(78, 43, 0, 0.15);
                }
            }
        }
    }
</style>