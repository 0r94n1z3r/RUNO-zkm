<template>
    <div class="category-column--og">
        <CategoryColumn
            :="{id:1, ids, k:0}"

            title="Гидравлическое оборудование"

            @next="emit('next', $event)"
            @prev="emit('start')"
            @start="emit('start')"
        />
        <CategoryColumn
            :="{id:115, ids, k:0}"

            title="Материалы для производства и ремонта"

            @next="emit('next', $event)"
            @prev="emit('start')"
            @start="emit('start')"
        />
    </div>
</template>

<script setup>
    const props = defineProps({
        ids: Array,
    })
    
    const emit = defineEmits(['next', 'start']);
</script>

<style lang="scss" scoped>
    .category-column--og{
        .category-column{
            height: auto;
            
            &:first-child{
                border-radius: 0;
            }
        }

        &>.category-column{
            :deep(.category-column-item--main-title){
                display: none;
            }
        }
    }
    
</style>