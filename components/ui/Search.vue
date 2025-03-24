<template>
    <TextInput 
        ref="inputRef"
        class="search"
        :placeholder="placeholder"
        :no-label="noLabel"
    >
        <Icon 
            class="search__icon"
            name="search"
            size="24"
        />
    </TextInput>
</template>

<script setup>
    const props = defineProps({
        placeholder: {
            type: String,
            default: 'Поиск'
        },
        noLabel: Boolean,
    })

    const inputRef = ref();

    defineExpose({
        input: inputRef
    })
</script>

<style lang="scss" scoped>
    .search{
        --border-color: var(--black-40);
        --border-radius: 1.2rem!important;
        --padding-x: 1.2rem!important;

        &__icon{
            color: var(--black-40);
        }
    }
</style>