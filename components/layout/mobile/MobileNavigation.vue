<template>
    <div class="mobile-navigation" id="mobile-navigation">
        <div class="mobile-navigation__container">
            <Navigation
                :list="['home', 'favorites', 'catalog', 'user', 'cart']"
            />
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
    .mobile-navigation{
        position: fixed;
        @include directions(unset, 0, 0, 0);
        z-index: 100;
        
        background: var(--white);
        border-radius: 1.2rem 1.2rem 0 0;
        box-shadow: 0 -.4rem 1rem 0 rgba(160, 158, 177, 0.25);

        &__container{
            padding: 1rem;
            display: flex;
            justify-content: center;
        }
        
        :deep(.navigation){
            gap: 1.4rem;

            .icon{
                width: 2.4rem!important;
                height: 2.4rem!important;
            }

            .navigation-item{
                width: 5.6rem;

                .navigation-item{
                    &__count{
                        transform: translate(40%, -17.5%);
                    }
                }

            }
        }
    }
</style>