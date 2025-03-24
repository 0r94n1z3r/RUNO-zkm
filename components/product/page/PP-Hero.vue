<template>
    <div class="pp-hero">
        <ProdCardChips class="mob-visible" :="{info}"/>

        <PP-Slider
            class="pp-hero__slider" 
            :="{info}"
            @fullscreen="sliderModalRef.call($event)"
        />
        <div class="pp-hero__descriptions">
            <PP-Actions :="{info}" />

            <div class="product-description" v-if="info?.description">
                <div class="product-description__content product-description__content--about">
                    <ParsedHTML :html="info?.description"/>
                </div>
                <NuxtLink 
                    class="text-link text-link--rev" 
                    to="#product-description"
                >
                    Подробное описание
                </NuxtLink>
            </div>
            <div class="product-description" v-if="info?.brand_id || info?.attributes?.length" >
                <div class="product-description__content">
                    <ProdCardProps :limit="5" has-brand :="{info}"/>
                </div>
                <NuxtLink 
                    v-if="info?.attributes.length"
                    class="text-link text-link--rev"
                    to="#product-props" 
                >
                    Все характеристики
                </NuxtLink>
            </div>
        </div>

        <PP-SliderFullscreen v-if="mounted" ref="sliderModalRef" :="{info, direction: 'horizontal'}"/>
    </div>
</template>

<script setup>
    const props = defineProps({
        info: Object
    })

    const sliderModalRef = ref();

    const mounted = ref();
    onMounted(()=>mounted.value = true);
</script>

<style lang="scss" scoped>
    .pp-hero{
        display: flex;
        gap: 3rem;
        min-width: 0;

        &__descriptions{
            @include flex-col;
            gap: 2.4rem;
            @include font-14;
            width: 100%;
        }

        @media (max-width: 800px){
            justify-content: center;
            flex-direction: column;
            gap: .8rem;

            &__descriptions{
                display: none;
            }

            :deep(.pp-hero__slider){
                width: 100%;

                .pp-thumbs-slider{
                    display: none;
                }

                .pp-slider{
                    &__slider{
                        width: 100%;
                    }
                }
            }
        }
    }


    .product-description{
        @include flex-col;
        gap: 1.2rem;

        &__content{
            &--about{
                :deep(.parsed-html){
                    white-space: pre-line;
                    @include multiple-text-overflow(5);
                    max-height: 7.5em;
                    max-height: 6lh;

                    *{
                        display: inline!important;
                    }
                }
            }
        }
    }

    .prod-card-chips{
        --padding: .6rem .8rem;
        --gap: .8rem;
        font-size: 1.4rem;
    }

    @include mob-display(800px);

</style>