<template>
    <div 
        class="checkbox" 
        :class="[
            model ? 'checkbox--checked' : '',
            disabled ? 'checkbox--disabled' : '',
            error ? 'checkbox--error' : '',
            `checkbox--${type}`
        ]" 
        @click="clickHandler"
    >

    <!-- input -->
        <div 
            class="checkbox__box" 
            v-if="type == 'default'" 
            :style="{
                width: `${calculatedSize.container/10}rem`, 
                height: `${calculatedSize.container/10}rem`
            }"
        >
            <Icon 
                class="checkbox__icon" 
                :name="halfChecked?'minus':'check'" 
                :size="calculatedSize.icon"
            />
        </div>
        <div 
            class="checkbox__switch"
            :class="{'checkbox__switch--active': model}"
            v-if="type == 'switch'" 
        ></div>
        <div 
            class="checkbox__radio" 
            v-if="type == 'radio'" 
            :style="{
                width: `${calculatedSize.container/10}rem`, 
                height: `${calculatedSize.container/10}rem`
            }"
        ></div>

    <!-- content -->
        <div class="checkbox__text">
            <p :class="textClass || `${calculatedSize.text}`" v-if="title || string">
                {{ title }} <span>{{ string }}</span>
            </p>
            <slot/>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        type: { // default / switch / radio
            type: String,
            default: "default"
        },
        title: String,
        string: String,
        size: { // large / medium / small
            type: String,
            default: 'medium'
        },
        textClass: String,
        disabled: Boolean,
        halfChecked: Boolean, // отображение -

        error: [String, Boolean],

        //radio
        radioList: Array, // при изменении model у всех radioList[radioKey] = false
        radioKey: {
            type: String,
            default: 'value'
        }
    })

    const emit = defineEmits(['change']);

    const model = defineModel();

    const clickHandler = ()=>{
        if(props.type == 'radio'){
            props.radioList?.forEach(e => e[props.radioKey] = false);
            model.value = true;
            emitChange();
            return;
        }

        model.value = !model.value;
        emitChange();
    }

    const emitChange = ()=>{
        setTimeout(()=>{emit('change', model.value)});
    }

    const calculatedSize = computed(()=>
        props.size == "large"?
            {
                container: 24,
                icon: 20,
                text: 'font-16'
            }:
        props.size == "medium"?
            {
                container: 20,
                icon: 16,
                text: 'font-14'
            }:
        props.size == "small"?
            {
                container: 16,
                icon: 16,
                text: 'font-12'
            }:{}
    );

    


</script>

<style lang="scss" scoped>
    .checkbox{
        --color: var(--black-20);
        --hov: var(--black-40);
        cursor: pointer;
        width: max-content;
        max-width: 100%;
        display: flex;
        gap: 1.6rem;

        &__box{
            border: .1rem solid var(--color);
            border-radius: .4rem;
            @include flex-c;
            transition: .3s;
            flex-shrink: 0;
            background: var(--white);
        }

        &__icon{
            color: transparent;
            transition: .3s;
        }

        &__radio{
            border: .1rem solid var(--color);
            border-radius: 50%;
            @include flex-c;
            transition: .3s;
            flex-shrink: 0;

            &::after{
                @include pseudo;
                height: 100%;
                width: 100%;
                background: var(--white);
                border-radius: 50%;
                transform: scale(.45);
                transition: .3s;
                opacity: 0;
            }
        }

        &__switch{
            position: relative;
            width: 3.8rem;
            @include flex-c;

            &::before,
            &::after{
                @include pseudo-absolute;
                transition: .3s;
            }

            &::before{
                height: 1.6rem;
                left: .2rem;
                right: .2rem;
                background: var(--color);
                border-radius: .8rem;
            }

            &::after{
                height: 2.4rem;
                width: 2.4rem;
                background: var(--white);
                border-radius: 50%;
                filter: drop-shadow(0 0 .1rem rgba(104, 111, 123, 0.31)) drop-shadow(0 .1rem .1rem rgba(104, 111, 123, 0.25));
                left: 0;
            }
        }

        &--checked{
            --color: var(--orange-100);
            --hov: var(--orange-80);
            
            .checkbox{
                &__box{
                    background: var(--color);
                }

                &__icon{
                    color: var(--white);
                }

                &__radio{
                    background: var(--color);

                    &::after{
                        opacity: 1;
                    }
                }

                &__switch{
                    --color: var(--orange-40);
                    --hov: var(--orange-60);
                    
                    &::after{
                        left: calc(100% - 2.4rem);
                        background: var(--orange-100)
                    }
                }
            }
        }

        @media (hover: hover){
            &:hover{
                *{
                    --color: var(--hov);
                }
            }
        }

        &--disabled{
            pointer-events: none;

            .checkbox__box{
                --color: var(--gray-100);
                background: var(--color);
            }
        }

        &--error{
            .checkbox__box{
                --color: var(--red-100);
            }
        }

        &__text{
            min-height: 100%;
            display: flex;
            align-items: center;
            padding-top: .2rem;

            span{
                color: var(--black-60);
            }
        }
    }
</style>