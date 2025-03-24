<template>
    <div class="cart-remove" @click="useCart().clean()">
        <Icon name="trash" size="16" />
        <p class="text-link">Очистить корзину</p>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
    .cart-remove{
        display: flex;
        align-items: center;
        gap: .6rem;
        @include font-14;
        color: var(--black-40);

        p{
            --underline: var(--black-40); 
        }
    }
</style>