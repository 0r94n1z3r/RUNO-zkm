<template>
    <div 
        class="catalog-preloader"
        :class="`catalog-preloader--${view}`"
    >
        <Placeholder
            class="catalog-preloader__item"
            v-for="i in 12"
            type="block"
        />
    </div>
</template>

<script setup>
    const props = defineProps({
        view: { // normal / horizontal
            type: String,
            default: 'normal'
        }
    })
</script>

<style lang="scss" scoped>
    .catalog-preloader{
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 3.2rem;

        &__item{
            width: 100%;
            height: 39.6rem;
        }

        @media (max-width: 1150px) {
            grid-template-columns: repeat(2, 1fr);
        }

        @media (max-width: 560px) {
            grid-template-columns: 1fr;
        }

        @media (max-width: $navigation-mobile) {
            grid-template-columns: repeat(3, 1fr);
        }

        @media (max-width: 850px) {
            grid-template-columns: repeat(2, 1fr);
        }

        @media (max-width: $mobile) {
            gap: var(--pad) calc(var(--pad) / 2);
            grid-template-columns: repeat(2, 1fr);

            &__item{
                height: 35.97rem;
            }
        }

        

        @media (min-width: calc($navigation-mobile + 1px)) {
            &--horizontal{
                grid-template-columns: 1fr!important;

                .catalog-preloader__item{
                    width: 100%!important;
                    height: 15.4rem!important;
                }
            }
        }
    }
</style>