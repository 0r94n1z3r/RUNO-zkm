<template>
    <div class="filter-preloader">
        <Placeholder 
            type="log"
            style="--width: 100%"
        />
        <div>
            <Placeholder
                v-for="i in 4"
                type="log"
                style="--width: 50%"
            />
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
    .filter-preloader{
        @include flex-col;
        gap: .4rem;
        margin-bottom: 2rem;
    }
</style>