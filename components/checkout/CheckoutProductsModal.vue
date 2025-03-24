<template>
    <MobileModal 
        unique-class="checkout-products-modal" 
        ref="modalRef"
    >
        <CheckoutProducts />
    </MobileModal>
</template>

<script setup>
//call
    const modalRef = ref();

    defineExpose({
        modal: modalRef
    });
</script>

<style lang="scss">
    .checkout-products-modal{
        .checkout-products{
            padding: 0;
            border: none;
        }

        .cart-total__buttons{
            display: none;
        }
    }
</style>