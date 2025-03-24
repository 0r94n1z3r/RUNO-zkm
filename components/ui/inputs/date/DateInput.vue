<template>
    <div class="date-input">
        <DatePicker 
            class="date-input__picker"
            v-model="model"
            :masks="{input: 'DD.MM.YYYY'}"
            :popover="{visibility: 'focus'}"
            :update-on-input="false"
            :is-range="range"
        >
            <template #default="{ inputValue, inputEvents }">
                <div class="date-input__date-input" v-if="range">
                    <TextInput
                        v-on="inputEvents.start"
                        :modelValue="inputValue.start"
                        :value="inputValue.start"
                        :="textInputProps"
                    />
                    <p class="text--subheading">–</p>
                    <TextInput
                        v-on="inputEvents.end"
                        :modelValue="inputValue.end"
                        :value="inputValue.end"
                        :="textInputProps"
                    />
                </div>

                <TextInput
                    v-else
                    v-on="inputEvents"
                    :modelValue="inputValue" 
                    :value="inputValue"
                    :="textInputProps"
                />
            </template>
        </DatePicker>
    </div>
</template>

<script setup>
    import { DatePicker } from 'v-calendar';
    import 'v-calendar/style.css';

    const props = defineProps({
        textInputProps: Object,
        range: Boolean,
    });

    const model = defineModel();

</script>

<style lang="scss" scoped>
    .date-input{
        &__date-input{
            display: flex;
            align-items: center;
            gap: .4rem;
        }
    }

    :deep(.vc-popover-content){
        --vc-popover-content-border: var(--gray-40);
        

        .vc-focusable{
            transition: .3s;
            transition: font-weight 0s all .3s;
            
        }

        button{
            background: transparent;
            transition: font-weight 0s all .3s;
            outline: none;

            &:hover{
                background: var(--gray-60);
            }

            &.vc-nav-item.is-active{
                background: var(--orange-100);
            }
        }

        .vc-light .vc-attr, 
        .vc-light
        {
            --vc-content-color: var(--orange-60);
            --vc-highlight-outline-bg: var(--orange-60);
            --vc-highlight-outline-border: transparent;
            --vc-highlight-outline-content-color: var(--black-100);
            --vc-highlight-light-bg: var(--orange-40);
            --vc-highlight-light-content-color: var(--black-100);
            --vc-highlight-solid-bg: var(--orange-100);
            --vc-highlight-solid-content-color: var(--white);
            --vc-dot-bg: var(--orange-100);
            --vc-bar-bg: var(--orange-100);
            --vc-focus-ring: transparent!important;
        }
    }
</style>