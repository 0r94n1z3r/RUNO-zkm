<template>
    <div class="mob-top-header content-wrapper">
        <Logo to="/" />
        <a  
            class="mob-top-header__item text-link--basic font-14"
            :href="`tel:${useStatic().contacts.tel}`"
        >
            <Icon name="phone-call" size="16"/>
            {{ useStatic().contacts.tel }}
        </a>
    </div>
</template>

<script setup>
    
</script>

<style lang="scss" scoped>
    .mob-top-header{
        @include padding-y(.8rem);
        @include flex-jtf();
        align-items: center;
        gap: 3rem;
        border-bottom: .1rem solid var(--black-10);
        position: relative;
        z-index: 1;
        background: var(--white);

        .logo{
            width: 5.7rem;
            height: 2rem;
        }

        &__item{
            display: flex;
            align-items: center;
            gap: .8rem;
        }
    }
</style>