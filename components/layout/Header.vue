<template>
    <div class="header" id="header">
        <DeskHeader class="desk-visible"/>
        <MobHeader class="mob-visible"/>
    </div>
</template>

<script setup>
    
</script>

<style lang="scss" scoped>
    .header{
        background: var(--white);
        box-shadow: 0 .4rem 1rem 0 rgba(160, 158, 177, 0.25);
        margin-bottom: 2.2rem;
        position: relative;
        z-index: 100;
        position: fixed;
        top: 0;
        width: 100%;
        max-width: var(--content-width);
    }

    @include mob-display($navigation-mobile);
</style>