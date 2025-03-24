<template>
    <div class="page">
        <SEOHead />

        <div class="page__wrapper">
            <Header/>
            <Categories/>
            <MobHeaderDrop/>
            <slot/>
        </div>
        <Footer/>
        <MobileNavigation class="mob-visible"/>

        <!-- global modals -->
            <AnnoyingModal/>
            <AuthModal/>
            <RegistrationSuccessModal/>
            <AuthRecoverSuccessModal/>
    </div>
</template>

<script setup>
    Init();
</script>

<style lang="scss" scoped>
    .page{
        padding-top: calc(var(--header-height--og, var(--header-height, 11.7rem)) + 2.2rem);
    }
    

    .page__wrapper{
        min-height: calc(100 * var(--vh));
    }

    @include mob-display($navigation-mobile);
</style>