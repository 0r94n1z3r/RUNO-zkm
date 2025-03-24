<template>
    <div class="product-page-preloader content-wrapper">
        <Placeholder class="product-page-preloader__title" type="block"/>
        <div class="product-page-preloader__content">
            <div class="product-page-preloader__slider-container">
                <div class="product-page-preloader__tiles">
                    <Placeholder v-for="i in 4" type="block"/>
                </div>
                <Placeholder type="block" class="product-page-preloader__slider"/>
            </div>
            <div class="product-page-preloader__description">
                <Placeholder class="product-page-preloader__subtitle"/>
                <Placeholder class="product-page-preloader__action"/>
                <Placeholder class="product-page-preloader__action"/>
                <Placeholder type="block" style="--width:100%;--height:12rem;"/>
                <Placeholder class="product-page-preloader__subtitle"/>
                <Placeholder class="product-page-preloader__subtitle"/>
                <div class="product-page-preloader__props">
                    <div class="product-page-preloader__prop" v-for="i in 3">
                        <Placeholder/>
                        <Placeholder/>
                    </div>
                </div>
                <Placeholder class="product-page-preloader__subtitle"/>
            </div>
            <Placeholder class="product-page-preloader__aside" type="block"/>
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
    .product-page-preloader{
        &__title{
            --height: 5.2rem;
            --radius: .4rem;
            --width: calc(100% - 30.2rem);
            margin-bottom: 3.2rem;
        }

        &__actions{
            @include flex-jtf;
            gap: 3.2rem;
            align-items: center;
            height: 2.4rem;
            margin-bottom: 2.4rem;

            @media (max-width: $mobile){
                margin-bottom: 0;
            }

            .placeholder{
                --width: 14rem;
            }
        }

        &__tabs{
            display: flex;
            align-items: center;
            gap: 4.8rem;
            height: 4.8rem;
            margin-bottom: 3.2rem;

            @media (max-width: $mobile){
                margin-bottom: 0;
            }

            .placeholder{
                --width: 10rem;
            }
        }

        &__content{
            display: flex;
            gap: 3.2rem;
            max-width: 100%;
            min-width: 0;
        }

        &__slider-container{
            display: flex;
            gap: 3.2rem;
            flex-shrink: 0;

            @media (max-width: $mobile){
                gap: var(--pad);
                flex-direction: column-reverse;
                max-width: 100%;
            }
        }

        &__slider{
            --width: 37rem;
            --height: 37rem;

            @media (max-width: $mobile){
                --width: 100%;
            }
        }

        &__tiles{
            @include flex-col;
            gap: 1.6rem;

            @media (max-width: $mobile){
                flex-direction: row;
                gap: var(--pad);
            }

            .placeholder{
                flex-shrink: 0;
                --width: 7rem;
                --height: 7rem;
                --radius: .8rem;

                @media (max-width: $mobile){
                    --width: 7.4rem;
                    --height: 7.4rem;
                }
            }
        }

        &__description{
            width: 100%;
            @include flex-col;
            gap: 1.2rem;
        }

        &__subtitle{
            --width: 14rem;
            margin: .8rem 0;
        }

        &__props{
            @include flex-col;
            padding: .4rem 0;
            gap: 1.6rem
        }

        &__prop{
            @include flex-jtf;
        }

        &__aside{
            flex-shrink: 0;
            --width: 27rem;
            --height: 26.6rem;
        }

        @media (max-width: 1100px) {
            &__title{
                width: 100%;
            }

            &__aside{
                display: none;
            }
        }

        @media (max-width: 800px) {
            &__title{
                display: none;
            }

            &__content{
                flex-direction: column;
            }
            &__subtitle,
            &__action,
            &__tiles{
                display: none;
            }
        }
    }
</style>