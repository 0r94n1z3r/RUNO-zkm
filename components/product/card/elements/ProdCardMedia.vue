<template>
    <div 
        class="prod-card-media"
        :key="info?.id"
    >
        <!-- no -->
        <Image 
            v-if="!info?.images?.length"
            class="
                prod-card-media__image
                prod-card-media__image--fake
            "
            :src="'/images/no-photo.jpg'" 
            :ratio="1" 
            root=""
            lazy
            :size="size"
        />

        <!-- single -->
        <Image
            v-else-if="props.single"
            class="prod-card-media__image"
            :src="info?.images[0]?.url"
            :ratio="1"
            :size="size"
        />

        <!-- slider -->
        <NuxtErrorBoundary @error="() => {}" v-else>
            <Swiper 
                lazy
            >
                <SwiperSlide v-for="(i,k) in info?.images">
                    <Image
                        class="prod-card-media__image"
                        :src="i.url"
                        :ratio="1"
                        :size="size"
                    />
                </SwiperSlide>
            </Swiper>
        </NuxtErrorBoundary>
    </div>
</template>

<script setup>
    const props = defineProps({
        info: Object,
        size: {
            type: [Number, String],
            default: 272
        },
        single: Boolean,
    })
</script>

<style lang="scss" scoped>
    //notdone virtual area?
    .prod-card-media{
        flex-shrink: 0;
    }
</style>