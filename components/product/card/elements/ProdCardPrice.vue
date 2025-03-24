<template>
    <div class="prod-card-price">
        <div v-if="info?.price_before" class="prod-card-price__old font-14 font--m">{{pricifyNumber(info?.price_before)}} ₽</div>
        <h5 class="prod-card-price__current" :style="{color: info?.price_before ? 'var(--orange-100)' : 'var(--black-100)' }">{{pricifyNumber(info?.price)}} ₽</h5>
    </div>
</template>

<script setup>
    const props = defineProps({
        info: Object
    })
</script>

<style lang="scss" scoped>
    .prod-card-price{
        @include flex-col;
        justify-content: end;

        &__old,
        &__current{
            white-space: nowrap;
        }

        &__old{
            color: var(--black-40);
            position: relative;
            width: max-content;
            padding: 0 .2rem;

            &::after{
                @include pseudo-absolute;
                @include all-directions(0);
                margin: auto;  
                height: 1px;
                background: var(--orange-50);
            }
        }
    } 
</style>