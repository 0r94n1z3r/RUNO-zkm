<template>
    <div class="desk-bot-header">

        <div class="desk-bot-header__wrapper content-wrapper">
            <Logo to="/"/>

            <div class="desk-bot-header__controls">
                <Button
                    class="desk-bot-header__categories-caller font--m" 
                    :icon-left="useCategories().called?`x`:`menu`" 
                    @click="useCategories().called = !useCategories().called"
                    size="small"
                >
                    Каталог
                </Button>
                <NuxtLink class="text-link--basic font--m" to="/pages/dostavka-i-oplata">
                    Доставка и оплата
                </NuxtLink>
                <NuxtLink class="text-link--basic font--m" to="/pages/contacts">
                    Контакты
                </NuxtLink>
            </div>

            <SearchGlobal
                noLabel
            />

            <Navigation />
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
    .desk-bot-header{
        background: var(--white);
        position: relative;

        &__wrapper{
            display: flex;
            align-items: center;
            @include padding-y(1.2rem);
            gap: 3rem;
        }
        
        .logo{
            width: 6.9rem;
            height: 2.4rem;
        }

        &__categories-caller{
            padding: .8rem 1.6rem;
        }

        &__controls{
            display: flex;
            align-items: center;
            gap: 1.6rem;
            flex-shrink: 0;

            a{
                @include virtual-area(.8rem);
            }
        }

        :deep(.navigation){
            margin-left: -.6rem;
        }
    }
</style>