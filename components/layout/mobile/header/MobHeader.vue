<template>
    <div class="mob-header">
        <MobTopHeader/>
        <div 
            class="mob-bot-header-wr" 
            ref="wrRef"
            :class="{'mob-bot-header-wr--shown': show}"
            :style="{'margin-top': show?0:`-${h}px`}"
        >
            <MobBotHeader/>
        </div>
    </div>
</template>

<script setup>
    const { y } = useWindowScroll();

    const wrRef = ref();
    const {height: h} = useElementSize(wrRef);

    const show = computed(()=>y.value<h.value);
</script>

<style lang="scss" scoped>
    .mob-bot-header-wr{
        transition: .3s;
        &:not(&--shown){
            // @include hidden(0);
        }
    }
</style>