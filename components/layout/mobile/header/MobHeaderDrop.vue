<template>
    <div 
        class="mob-header-drop"
        :class="{'mob-header-drop--called': useLayout().headerDropCalled}"
        @click.self="close"
        @mousewheel.self.prevent
    >
        <div 
            class="mob-header-drop__wrapper"
        >
            <div class="mob-header-drop__block">
                <h6>Покупателям</h6>
                <div 
                    class="mob-header-drop__link"
                    v-for="i in useContentPages().list"
                >
                    <NuxtLink  
                        class="text-link text-link--inline" 
                        :href="`/pages/${i.name}`"
                    >
                        {{ i.title }}
                    </NuxtLink>
                </div>
            </div>
            <div class="mob-header-drop__block">
                <h6>О компании</h6>
                <div 
                    class="mob-header-drop__link"
                    v-for="i in [
                        {title: 'Контакты', to: '/pages/contacts'},
                    ]"
                >
                    <NuxtLink  
                        class="text-link text-link--inline" 
                        :href="i.to"
                    >
                        {{ i.title }}
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    const close = ()=>{
        useLayout().headerDropCalled = false;
    }
</script>

<style lang="scss" scoped>
    .mob-header-drop{
        @media (min-width: calc($navigation-mobile + 1px)){
            display: none;
        }

        position: fixed;
        top: var(--header-height);
        left: 0;
        right: 0;
        z-index: 99;
        flex-grow: 1;
        transition: .3s;

        min-height: max-content;

        background: var(--black-transparent);
        
        height: calc(
            100 * var(--vh) - 
            var(--header-height) - 
            var(--mobile-navigation-height) +
            1.2rem
        );
        
        &:not(&--called){
            @include hidden(-1rem);
        }

        &__wrapper{
            @include flex-col;
            gap: 2.4rem;
            filter: drop-shadow(0 .4rem .5rem rgba(160, 158, 177, 0.25));
            padding: 1.8rem var(--pad) 2.4rem;
            background: var(--white);
            border-radius: 0 0 .8rem .8rem;

            h6{
                margin-bottom: .4rem;
            }
        }

        &__block{
            @include flex-col;
            gap: .6em;
        }
    }
</style>