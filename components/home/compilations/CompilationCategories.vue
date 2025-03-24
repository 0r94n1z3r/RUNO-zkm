<template>
    <HomeWrapper
        class="compilation-categories"
        :title="cat?.title"
    >
        <div 
            class="compilation-categories__grid"
            :class="{'compilation-categories__grid--hor': isHor}"
        >
            <CategoryCard 
                v-for="i in subs"
                :info="i"
                :hor="isHor"
            />
        </div>
    </HomeWrapper>
</template>

<script setup>
    const props = defineProps({
        id: [String, Number]
    })


    const cat = ref();
    const subs = ref([]);

    const isHor = computed(()=>subs.value.length < 4);

    //init
        if(useCategories().initLoading){
            const {data: {value: fetched}} = await useAPI(`/categories/category/${props.id}/subcategories`);
            cat.value = fetched?.parent;
            subs.value = fetched?.subcategories;
        }else{
            cat.value = useCategories().category(props.id);
            subs.value = useCategories().subCategories(props.id);
        }


</script>

<style lang="scss" scoped>
    .compilation-categories{
        &__grid{
            display: grid;
            gap: 1.6rem;
            grid-template-columns: repeat(auto-fit, minmax(18.1rem, 1fr));

            &--hor{
                grid-template-columns: repeat(auto-fit, minmax(34.2rem, 1fr));
            }

            @media (max-width: $mobile) {
                grid-template-columns: repeat(2, 1fr);
                gap: .8rem;

                &--hor{
                    grid-template-columns: 1fr;
                }
            }

        }
    }
</style>