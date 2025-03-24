<template>
    <div class="pp-attributes" id="product-props">
        <h2>Характеристики и применяемость</h2>

        <div class="pp-attributes__container">
            <ProdCardProps :={info} has-brand :limit="999999"/>
            <ProdCardApplications :={info} :limit="999999"/>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        info: Object
    })
</script>

<style lang="scss" scoped>
    .pp-attributes{
        padding-top: 10rem;
        margin-top: -10rem;

        h2{
            margin-bottom: 2.4rem;

            @media (max-width: $mobile) {
                @include font-h3;
            }
        }

        &__container{
            display: flex;
            width: 100%;
            gap: 3rem;

            &>*{
                width: 100%;
            }

            @media (max-width: 800px) {
                flex-direction: column;
            }
        }
    }
</style>