<template>
    <div 
        class="text-input"
        :class="{
            'text-input--focused': isFocused,
            'text-input--disabled': disabled,
            'text-input--label': label,
            'text-input--error': error,
            'text-input--notFocusable': !focusable,
        }"
        @click="focus"
    >
        <input 
            class="text-input__input"
            :type="actualType"
            ref="inputRef"
            @focus="focusHandler"
            @blur="blurHandler"
            @input="emit('input', $event)"
            @change="emit('change', $event)"
            @keydown.enter="()=>{
                confirm();
                blur();
            }"
            v-model="bcpValue"
            :="{placeholder: placeholder + (required?'*':'')}"

            v-maska="mask"
        >

        <div class="text-input__icons">
            <slot/>

            <!-- confirm-only -->
            <div class="confirm-only" v-if="confirmOnly && bcpValue !== model">
                <div class="confirm-only__control" @click.prevent="cancel">
                    <Icon name="content__close" :size="iconSize"/>
                </div>
                <div class="confirm-only__control" @click.prevent="confirm">
                    <Icon name="essentials__check" :size="iconSize"/>
                </div>
            </div>

            <template v-else>
                <!-- tooltip -->
                <Tooltip 
                    v-if="tooltip"
                    :text="tooltip"
                    :size="iconSize"
                />

                <!-- password -->
                <PasswordEye 
                    v-if="type=='password'" 
                    v-model="isPasswordShown"
                    :size="iconSize"
                />
            </template>
        </div>

        <div class="text-input-border">
            <div class="text-input-border__wrapper">
                <p v-if="!noLabel" class="text-input-border__text">{{ label || ((isFocused || model) && placeholder) || null }}</p>
                <div class="text-input-border__line"></div>
            </div>
            <div class="text-input-border__bottom-line"></div>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        type: {
            type: String,
            default: "text",
        },

        placeholder: String, 
        disabled: Boolean,
        error: null,
        label: String,
        noLabel: Boolean,

        tooltip: String,
        iconSize: {
            type: [String, Number],
            default: 24
        },

        confirmOnly: Boolean, //Появляется (Х)(✔)
        
        mask: [String, Object],

        focusable: {
            type: Boolean,
            default: true
        },

        required: Boolean,
    })

    const emit = defineEmits(['focus','blur','input','change','update'])

    const model = defineModel({});

    const bcpValue = ref(model.value);
    watch(model, ()=>{
        if(model.value != bcpValue.value)bcpValue.value = model.value;
    })

    const inputRef = ref();

//confirmOnly
    watch(bcpValue, (n,o)=>{
        if(!props.confirmOnly){
            model.value = n;
            // emit('update', n);
            return;
        }
    })

    const confirm = ()=>{
        model.value = bcpValue.value;
        // emit('update', model.value);
        setTimeout(blur);
    }

    const cancel = ()=>{
        bcpValue.value = model.value;
        confirm();
    }

//type
    const actualType = computed(()=>{
        if(props.type != "password")return props.type;
        return isPasswordShown.value?"text":"password";
    })

//password
    const isPasswordShown = ref(false);



//focus/blur
    const isFocused = ref(false);

    const focus = ()=>{
        if(!props.focusable)return;
        inputRef.value.focus();
    }

    const focusHandler = (e)=>{
        isFocused.value = true;
        emit('focus', e);
    }

    const blur = ()=>{
        inputRef.value.blur();
    }

    const blurHandler = (e)=>{
        isFocused.value = false;
        emit(
            'blur', 
            e, 
            {isConfirmed: bcpValue.value == model.value}
        );
    }

    defineExpose({
        focus,
        blur,
        input: inputRef
    })
</script>

<style lang="scss" scoped>
    .text-input{
        --border-color: var(--black-20);
        --padding-x: 2rem;
        --padding-y: .8rem;
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

            .text-input__input{
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

        &--notFocusable{
            input{
                pointer-events: none;
            }
        }

        &__input{
            width: 100%;
            padding: var(--padding-y) var(--padding-x);

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

        @media (max-width: $mobile) {
            --padding-x: .8rem;
            --padding-y: .8rem;
        }
    }

    .text-input-border{
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

    .confirm-only{
        display: flex;
        gap: .8rem;

        &__control{
            cursor: pointer;
            @include virtual-area(.4rem);
            transition: .3s;
            color: var(--black-100);

            @media (hover:hover) {
                &:hover{
                    color: var(--orange-80)
                }
            }
        }
    }
</style>