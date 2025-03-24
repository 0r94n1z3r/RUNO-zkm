<template>
    <div class="checkboxes-input">
        <Checkbox 
            v-for="i in model.slice(0, drop?undefined:limit)"
            v-model="i.value" 
            :="i"
        />
        <p
            class="drop text-link text-link--rev"
            @click="drop = !drop"
            v-if="limit < model.length"
        >
            <template v-if="!drop">Показать все ({{ model.length }})</template>
            <template v-else>Скрыть</template>
        </p>
    </div>
</template>

<script setup>
    const props = defineProps({
        limit: {
            type: Number,
            default: 3
        }
    })

    const model = defineModel() // [{title: String, value: Boolean, string: String}]

    const drop = ref(false);
</script>

<style lang="scss" scoped>
    .checkboxes-input{
        @include flex-col;
        gap: 1.6rem;
    }

    .drop{
        cursor: pointer;
        transition: .3s;
        @include font-12;
    }
</style>