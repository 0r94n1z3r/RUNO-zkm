<template>
    <Placeholder
        v-if="info?.loading"
        class="prod-card prod-card--placeholder"
        type="block"
    />
    <Card 
        v-else-if="info"
        class="prod-card prod-card--normal"
        :to="`/product/${info?.name}`"
    >
        <ProdCardChips :="{info}"/>
        <div class="prod-card__image-wr">
            <ProdCardActions :="{info}"/>
            <ProdCardMedia :="{info}"/>
        </div>
        <div class="prod-card__title-wr">
            <ProdCardTitle :="{info}"/>
            <ProdCardAvailability :="{info}"/>
        </div>
        <ProdCardProps :limit="3" has-brand :="{info}"/>
        <div class="prod-card__price-wr">
            <ProdCardPrice :="{info}"/>
            <ProdCardButton :="{info}"/>
            <!-- notdone? full для мобилок? -->
        </div>
    </Card>
</template>

<script setup>
    const props = defineProps({
        info: Object
    })
</script>

<style lang="scss" scoped>
    .prod-card{
        --padding: 1.6rem;

        @include flex-col;
        gap: 1.4rem;
        padding: var(--padding);
        width: 27rem;

        &__image-wr{
            position: relative;
        }

        .prod-card-actions{
            position: absolute;
            top: 0;
            right: 0;
            z-index: 2;
        }

        &__title-wr{
            @include flex-col;
            gap: .8rem;
        }

        &__price-wr{
            @include flex-jtf;
            gap: .8rem;
        }

        &--placeholder{
            --height: 40rem;
        }

        @media (max-width: 800px){
            :deep(.prod-card-prop){
                display: block;
                .prod-card-prop{
                    &__spacer{
                        display: none;
                    }

                    &__title{
                        color: var(--black-100);
                        span::after{
                            content: ': ';
                        }
                    }

                    &__value:not(.text-link){
                        span{
                            color: var(--gray-100);
                        }
                    }

                    &__title, &__value{
                        display: inline;
                        span{
                            background: transparent;
                        }
                    }
                }
            }
        }

        @media (max-width: $mobile){
            width: 16rem;
            --padding: 1rem;
            gap: .8rem;

            &--placeholder{
                --height: 35.97rem;
            }

            &__price-wr{
                flex-direction: column;

                .prod-card-button{
                    align-self: end;
                }
            }
        }
    }
</style>