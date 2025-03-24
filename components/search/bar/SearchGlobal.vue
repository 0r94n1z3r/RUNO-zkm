<template>
    <div 
        class="search-global"
        ref="searchRef"
    >
        <Search
            v-model="useSearch().searchText"
            :="{placeholder, noLabel}"
            ref="inputRef"
            @focus="focusHandler"
            @keydown.enter="blurHandler"   
        />
        <SearchDrop
            :={called}
            @clicked="hideDrop"
        />
    </div>
</template>

<script setup>
    const props = defineProps({
        placeholder: {
            type: String,
            default: 'Искать в каталоге'
        },
        noLabel: Boolean,
    })

    const searchRef = ref();

    
//call
    const called = ref(false);
    
    onClickOutside(
        searchRef, 
        () => called.value = false, 
    )

    const focusHandler = ()=>{
        called.value = true;
        useCategories().called = false;
    }
    
    const blurHandler = ()=>{
        hideDrop();
        R().push(`/search?q=${useSearch().searchText}`);
    }

    const hideDrop = ()=>{
        called.value = false;
        useCategories().called = false;
    }
    
//expose
    const inputRef = ref();
    const focus = ()=>{
        inputRef.value?.input?.focus();
    }

    defineExpose({
        input: {focus}
    })
</script>

<style lang="scss" scoped>
    .search-global{
        width: 100%;
        position: relative;

        .search-drop{
            position: absolute;
            top: calc(100% + 1rem);
        }
    }
</style>