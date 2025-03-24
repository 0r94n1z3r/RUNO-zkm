<template>
    <ClientOnly>
        <div 
            class="pag-loader"
            v-show="!pagStop || loading"   
        >
            <div 
                class="pag-loader__trigger"
                ref="triggerRef"
                :style="`transform: translateY(-${bump}px)`"
            >
            </div>
            <Loading/>
        </div>
    </ClientOnly>
</template>

<script setup>
    const props = defineProps({
        totalPages: Number,
        loading: Boolean,

        scrollObject: Object,
        bump: {
            type: [String, Number],
            default: 550
        }
    });

    const model = defineModel(); // Всегда массив: [1] если одна страница [1,2,3 ...] если была прожата кнопка "показать еще" 
    const pagPause = defineModel("pagPause");

////////////////////////////////////////////////////////////////
    const pagStop = computed(()=>
        model.value[model.value.length - 1] == props.totalPages
    );

    const checkPag = ()=>{
        if(
            !pagPause.value && 
            !pagStop.value
        ){
            pause();
            model.value.push((model.value[model.value.length - 1] || 0) + 1);
        }
    }

    //trigger
        const triggerRef = ref();
        const isTriggered = useElementVisibility(triggerRef);

        watch(isTriggered, (n)=>{
            if(n)checkPag();
        })

    const pause = ()=>{pagPause.value = true};

</script>

<style lang="scss" scoped>
    .pag-loader{
        @include padding-y(2rem);
    }
</style>