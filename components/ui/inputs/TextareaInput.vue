<template>
    <div 
        class="textarea-input"
        :class="{
            'textarea-input--focused': isFocused,
            'textarea-input--disabled': disabled,
            'textarea-input--label': label,
            'textarea-input--error': error,
            'textarea-input--limit': hasLimit,
        }"
        @click="focus"
    >
        <textarea 
            class="textarea-input__input"
            type="text"
            ref="inputRef"
            @focus="focusHandler"
            @blur="blurHandler"
            v-model="model"
            cols
            :="{
                placeholder,
                rows
            }"
        ></textarea> 

        <div class="textarea-input__limit font-14" v-if="hasLimit">
            {{ model?.length || 0 }} / {{ limit }}
        </div>

        <div class="textarea-input__icons">
            <slot/>
        </div>
        <div class="textarea-grab">
            <Icon 
                class="textarea-grab__icon"
                name="textarea-grab"
            />
        </div>
        <div class="textarea-input-border">
            <div class="textarea-input-border__wrapper">
                <p v-if="!noLabel" class="textarea-input-border__text textarea-label textarea-label--medium">{{ label || ((isFocused || model) && placeholder) || null }}</p>
                <div class="textarea-input-border__line"></div>
            </div>
            <div class="textarea-input-border__bottom-line"></div>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        placeholder: String, 
        disabled: Boolean,
        error: null,
        label: String,
        noLabel: Boolean,
        limit: Number,
        rows: {
            type: Number,
            default: 3
        },
    })

    const emit = defineEmits(['focus','blur'])

    
    const model = defineModel();
    
    watch(model, (n, o) => {
        if(!hasLimit)return;
        
        if(n.length > props.limit){
            if(o == 0){
                model.value = n.slice(0, props.limit);
                return;
            }
            model.value = o;
        }
    })
    
    
//limit
    const hasLimit = computed(() => props.limit != null);
    
//focus/blur
    const inputRef = ref();

    const isFocused = ref(false);

    const focus = ()=>{
        inputRef.value.focus();
    }

    const focusHandler = ()=>{
        isFocused.value = true;
        emit('focus');
    }

    const blur = ()=>{
        inputRef.value.blur();
    }

    const blurHandler = ()=>{
        isFocused.value = false;
        emit('blur');
    }

    defineExpose({
        focus,
        blur
    })
</script>

<style lang="scss" scoped>
    .textarea-input{
        --border-color: var(--black-20);
        --padding-x: 2rem;
        --padding-y: 0.875em;
        --border-radius: .8rem;

        position: relative;
        display: flex;
        align-items: center;
        width: 100%;
        background: var(--white);

        border: .1rem solid transparent;
        border-radius: var(--border-radius);

        &--focused{
            border-color: transparent;
            --border-color: var(--black-40)!important;

            .textarea-input__input{
                &::placeholder{
                    color: transparent;
                }
            }
        }

        &--error{
            --border-color: var(--red-100);
            background: var(--red--20);
        }

        &--disabled{
            pointer-events: none;
            border-color: var(--black-20);
        }

        &__input{
            width: 100%;
            padding: var(--padding-y) var(--padding-x);
            resize: vertical;
            min-height: 4lh;


            &::placeholder{
                transition: .2s;
                color: var(--black-40);
            }
        }

        &__icons{
            display: flex;
            gap: .8rem;
            transition: .3s;
            color: var(--border-color);
            padding-right: var(--padding-x);

            &:empty{
                display: none;
            }
        }


        &--limit{
            margin-bottom: 2.8rem;
        }

        &__limit{
            position: absolute;
            top: calc(100% + .8rem);
            right: .5rem;
            color: var(--black-40)
        }

        @media (max-width: $mobile) {
            --padding-x: .8rem;
            --padding-y: .8rem;
            --border-radius: .8rem;
        }
    }

    .textarea-input-border{
        position: absolute;
        pointer-events: none;
        transition: .3s;
        @include all-directions(-.1rem);
        @include flex-col;
        justify-content: space-between;
        padding: 0 var(--padding-x);

        *{transition: .3s}

        &:before,
        &:after{
            @include pseudo-absolute;
            top: 0;
            height: 100%;
            border: .1rem solid var(--border-color);
            transition: .3s
        }

        &:before{
            border-right: none;
            left: 0;
            width: var(--padding-x);
            border-radius: var(--border-radius) 0 0 var(--border-radius);
        }

        &:after{
            border-left: none;
            right: 0;
            width: var(--padding-x);
            border-radius: 0 var(--border-radius) var(--border-radius) 0;
        }

        &__wrapper{
            display: flex;
            height: .1rem;
            min-width: 0;
        }
        
        &__text{
            padding: 0 .4rem;
            flex-shrink: 0;
            max-width: 100%;
            @include text-overflow;
            height: max-content;
            color: var(--border-color);
            margin-top: -1rem;
            // background: var(--white);
            @include font-14;

            &:empty{
                display: none;
            }
        }

        &__line{
            border-bottom: .1rem solid var(--border-color);
            width: 100%;
        }

        &__bottom-line{
            border-bottom: .1rem solid var(--border-color);
        }
    }

    .textarea-grab{
        position: absolute;
        bottom: 0;
        right: 0;
        pointer-events: none;
        background: var(--white);
        color: var(--black-20)
    }
</style>