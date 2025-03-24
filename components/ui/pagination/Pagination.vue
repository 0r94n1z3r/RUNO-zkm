<template>
    <div 
        class="pagination"
        v-if="totalPages>1"
    >
        <Button 
            class="pagination__button" 
            type="secondary" 
            v-if="currentPage < totalPages"
            @click="buttonHandler"
        >
            Показать ещё
        </Button>   
        <Paginator 
            v-model="activePage" 
            @update:modelValue="updateHandler" 
            :="{totalPages}"
        />
    </div>
</template>

<script setup>
    const props = defineProps({
        totalPages: Number
    });

    const model = defineModel(); // Всегда массив: [1] если одна страница [1,2,3 ...] если была прожата кнопка "показать еще" 
    
    const currentPage = computed(()=>model.value[model.value.length - 1]);
    const activePage = ref(currentPage.value);

    
    const updateHandler = ()=>{
        useWindowScroll().y.value = 0;
        model.value = [activePage.value];
    }

    const buttonHandler = ()=>{
        model.value.push(currentPage.value+1);
    }

    watch(()=>[...model.value], ()=>{
        activePage.value = currentPage.value
    });
</script>

<style lang="scss" scoped>
    .pagination{
        @include flex-col;
        align-items: center;

        &__button{
            width: 100%;
            margin-bottom: 3.2rem;
        }
    }
</style>