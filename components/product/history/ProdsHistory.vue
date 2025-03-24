<template>
    <HomeWrapper 
        class="prods-history"
        title="Просмотренные товары"
        v-if="useProdsHistory()?.list?.length || useProdsHistory()?.loading"
    >
        <div class="prods-history__controls" :style="{opacity: Number(!useProdsHistory().loading)}">
            <p>
                Всего в истории 
                {{ useProdsHistory().list.length }} 
                {{ pluralizeWord(['товар', 'товара', 'товаров'], useProdsHistory().list.length) }}
            </p>
            <div 
                class="prods-history__action text-link" 
                @click="useProdsHistory().clear()"
            >
                <Icon name="trash" :size="16"/>
                <p>Очистить историю</p>
            </div>
        </div>

        <ProdsCarousel
            :="{list}"
            type="compact"
            :loop="false"
            :loading="useProdsHistory().loading"
        />
        
    </HomeWrapper>
    
</template>

<script setup>
    const productName = computed(()=>R().params.productName);

    const list = computed(()=>{
        const l = useProdsHistory().list;
        
        if(!productName.value)return l;

        return l.filter(e => e.name != productName.value);
    })
</script>

<style lang="scss" scoped>
    .prods-history{
        &__controls{
            margin-top: -1.6rem;
            margin-bottom: 2.4rem;
            display: flex;
            flex-wrap: wrap;
            @include font-14;
            gap: 1.2rem 3rem;
            color:  var(--black-40);
        }

        &__action{
            display: flex;
            align-items: center;
            gap: .6rem;
            --underline: var(--black-20);
        }
    }
</style>