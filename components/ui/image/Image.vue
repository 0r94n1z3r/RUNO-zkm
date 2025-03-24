<template>
    <div 
        class="image" 
        :key="src"
        :style="{'--fit': fit}"
    >
        <div 
            class="image__container"
            :style="{
                'padding-bottom': Math.pow(ratio, -1)*100 + '%'
            }"
        >   
            <!-- <img :src="srcDisplay" alt=""> -->
            <img :src="srcDisplay + (size?`?size=${size}`:'')" alt="" :loading="lazy?'lazy':null">
            
        </div>
    </div>
</template>

<script setup>
    const props =  defineProps({
        src: String,
        ratio: Number, // отношение [Ширина/Высота]
        size: [Number, String],
        fit: {
            type: String,
            default: 'contain'
        },
        lazy: {
            type: Boolean,
        }
    })

    const srcDisplay = computed(()=>{
        if(!process.dev)return props.src;
        return props.src?.replace('/api', useRuntimeConfig().public.baseURL) || '';
    })
</script>

<style lang="scss" scoped>
    .image{
        flex-shrink: 0;
        display: block;
        --fit: contain;
        
        &__container{
            position: relative;
            width: 100%;
            height: 100%;
        }

        img{
            position: absolute;
            top: 0;
            left: 0;
            display: block;
            width: 100%;
            height: 100%;
            object-fit: var(--fit);

            &[src=""]{
                opacity: 0;
            }
        }
    }
</style>