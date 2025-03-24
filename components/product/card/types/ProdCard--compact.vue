<template>
    <Placeholder
        v-if="info?.loading"
        class="prod-card prod-card--placeholder"
        type="block"
    />
    <Card 
        v-else
        class="prod-card prod-card--compact"
        :to="`/product/${info.name}`"
    >
        <ProdCardMedia 
            :={info}
            single    
        />
        <div class="prod-card__content">
            <p>{{ info.title }}</p>
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
        width: 17rem;
        overflow: hidden;

        &__content{
            padding: .8rem;

            p{
                @include font-h6;
                @include multiple-text-overflow(5);
            }
        }

        &--placeholder{
            --height: 26rem;
        }

        @media (max-width: $mobile) {
            width: 16rem;

            &--placeholder{
                --height: 24.948rem;
            }
        }
    }
</style>