<template>
    <div class="cart-list content-wrapper">
        <CartProduct
            v-for="(i,k) in useCart().list"
            :info="i"
            :n="k+1"
        />
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
    .cart-list{
        @include flex-col;
        gap: 2.4rem;
    }
</style>