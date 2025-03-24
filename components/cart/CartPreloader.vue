<template>
    <div class="cart-preloader content-wrapper">
        <Placeholder
            v-for="i in 3"
            type="log"
            style="--width: 100%; --height: 7rem; --PH-pad: 2.4rem;"
        />
        <div class="cart-preloader__controls">
            <Placeholder
                type="log"
                style="--width: 14.1rem;"
            />
            <Placeholder
                type="log"
                style="--width: 40rem;"
            />
        </div>

        <div class="cart-preloader__btns">
            <Placeholder
                type="block"
                style="--width: 22.6rem; --height: 4.6rem;"
            />
            <Placeholder
                type="block"
                style="--width: 19rem; --height: 4.6rem;"
            />
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
    .cart-preloader{
        @include flex-col;
        gap: 2.4rem;
        margin-bottom: 10rem;

        &__controls{
            @include flex-jtf;
            margin-top: 2rem;
        }

        &__btns{
            display: flex;
            gap: .8rem 3.2rem;
            justify-content: end;
            --radius: 9rem;
            margin-top: 2.5rem;
        }
    }
</style>