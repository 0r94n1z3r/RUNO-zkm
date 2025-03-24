<template>
    <div class="paginator">
        <!-- < -->
        <div 
            class="paginator__button paginator__button--navigation" 
            :class="{
                'paginator__button--disabled': activePage == 1
            }" 
            v-if="totalPages > 1"
            @click="activePage--"
        >
            <Icon name="navigation__chevron-right"/>
        </div>

        <!-- 1 -->
        <div 
            class="paginator__button" 
            :class="{'paginator__button--active': activePage == 1}"
            @click="activePage = 1"
        >
            1
        </div>

        <!-- ... -->
        <div 
            class="paginator__button paginator__button--more" 
            v-if="activePage > 4  && totalPages > 6"
        >
            ...
        </div>

        <!-- 7, 8, 9 -->
        <div 
            class="paginator__button" 
            :class="{'paginator__button--active': activePage == i}"
            @click="activePage = i" v-for="i in pages"
        >
            {{ i }}
        </div>

        <!-- ... -->
        <div 
            class="paginator__button paginator__button--more" 
            v-if="activePage <= totalPages-4  && totalPages > 6"
        >
            ...
        </div>

        <!-- 15 -->
        <div 
            class="paginator__button" 
            :class="{'paginator__button--active': activePage == totalPages}"
            @click="activePage = totalPages" 
            v-if="totalPages >= 2"
        >
            {{ totalPages }}
        </div>

        <!-- > -->
        <div 
            class="paginator__button paginator__button--navigation" 
            :class="{
                'paginator__button--disabled': activePage == totalPages,
            }" 
            v-if="totalPages > 1"
            @click="activePage++"
        >
            <Icon name="navigation__chevron-right"/>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        totalPages: Number
    });

    const activePage = defineModel();

    const pages = computed(()=>{
        if(props.totalPages <= 2)return [];
        if(props.totalPages <= 6)return getFilledArray(2, props.totalPages - 1);
        if(activePage.value <= 4)return getFilledArray(2, 5);
        if(activePage.value > props.totalPages - 4)return getFilledArray(props.totalPages - 4, props.totalPages - 1);
        return getFilledArray(activePage.value-1, activePage.value+1);
    });

    const getFilledArray = (start, end) => { // получает 2, 5 возвращает [2,3,4,5]
        return Array.from({length: end - start + 1}, (_, i) => start + i);
    }
</script>

<style lang="scss" scoped>
    .paginator{
        display: flex;
        gap: 1.6rem;

        &__button{
            height: 2.4rem;
            min-width: 2.4rem;
            border-radius: .4rem;
            padding: 0 .2rem;
            transition: .3s;
            text-align: center;
            user-select: none;

            &:not(:is(&--more, &--active)){
                cursor: pointer;

                @media (hover: hover){
                    &:hover{
                        color: var(--orange-100);
                    }
                }
            }

            &--disabled{
                pointer-events: none;
                color: var(--black-20);
            }

            &--active{
                background: var(--orange-100);
                color: var(--white);
            }

            &--navigation{
                padding: 0;

                &:first-child{
                    margin-right: 1.6rem;
                    transform: scale(-1);
                }

                &:last-child{
                    margin-left: 1.6rem;
                }
            }
        }

        @media (max-width: $mobile) {
            gap: .6rem;
        }
    }
</style>