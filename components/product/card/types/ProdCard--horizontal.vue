<template>
    <Placeholder
        v-if="info?.loading"
        class="prod-card prod-card--placeholder"
        type="block"
    />
    <Card 
        v-else
        class="prod-card--horizontal"
        :to="`/product/${info?.name}`"
    >
        <div class="prod-card__image-wr">
            <ProdCardActions :="{info}"/>
            <ProdCardMedia :="{info}"/>
        </div>

        <div class="prod-card__content-wr">
            <ProdCardChips :="{info}"/>
            <div class="prod-card__content">
                <div class="prod-card__info">
                    <ProdCardTitle :="{info}"/>
                    <ProdCardAvailability :="{info}"/>
                </div>
                <div class="prod-card__price-wr">
                    <ProdCardPrice :="{info}"/>
                    <ProdCardButton :="{info}"/>
                </div>
            </div>
            <ProdCardProps :limit="3" has-brand :="{info}"/>
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
        padding: 1.6rem;
        display: flex;
        gap: 6rem;

        &__image-wr{
            display: flex;
            align-items: start;
            gap: .8rem;
            flex-shrink: 0;
        }

        .prod-card-media{
            width: 12rem;
        }

        &__content-wr{
            @include flex-col;
            gap: 1.2rem;
            width: 100%;
        }

        .prod-card-chips{
            justify-content: start;
        }

        &__content{
            @include flex-jtf;
            gap: 3rem;
            align-items: start;
        }

        &__info{
            width: 55%;
        }

        .prod-card-title{
            margin-bottom: 1.2rem;
            :deep(h5){
                min-height: unset!important;
            }
        }   

        &__price-wr{
            @include flex-jtf;
            align-items: center;
            gap: 3rem;
            width: 45%;

            .prod-card-price{
                min-height: 4rem;
                justify-content: start;
            }
        }

        &--placeholder{
            --height: 15.4rem;
        }
    }
</style>