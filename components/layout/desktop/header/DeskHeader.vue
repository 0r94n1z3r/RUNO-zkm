<template>
    <div class="desk-header">
        <div 
            class="desk-top-header-wr" 
            ref="wrRef" 
            :style="{'margin-bottom': show?0:`-${h}px`}"
        >
            <DeskTopHeader />
        </div>
        <DeskBotHeader />
    </div>
</template>

<script setup>
    const { y } = useWindowScroll();

    const wrRef = ref();
    const {height: h} = useElementSize(wrRef);

    const show = computed(()=>y.value<h.value);
</script>

<style lang="scss" scoped>
    .desk-top-header-wr{
        transition: .1s;
    }
</style>