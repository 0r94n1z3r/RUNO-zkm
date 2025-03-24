<template>
    <div class="mob-bot-header content-wrapper">
        <SearchGlobal class="mob-bot-header__search font-14" no-label/>
        <Button 
            class="mob-bot-header__button"
            :icon-left="useLayout().headerDropCalled?`x`:`menu`"
            @click="useLayout().headerDropCalled = !useLayout().headerDropCalled"
            size="small"
        />
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
    .mob-bot-header{
        @include padding-y(2rem);
        display: flex;
        gap: .8rem;

        &__search{
            :deep(.text-input){
                --padding-x: .8rem;
            }
        }

        :deep(.button){
            --rad: .4rem;
            padding: .9rem!important;
        }
    }
</style>