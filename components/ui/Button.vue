<template>
    <Component
        :is="component"
        :to="to"
        :class="[
            `button`,
            `button--${type}`,
            `${isEmpty && 'button--round' || ''}`,,
            `${disabled && 'button--disabled' || ''}`,
            `${loading && 'button--loading' || ''}`,
            `${calculatedSize.text}`,
        ]"
        :style="{
            'padding-right': calculatedSize.padding[Number(isEmpty)],
            'padding-left': calculatedSize.padding[Number(isEmpty)],
            'padding-top': calculatedSize.padding[1],
            'padding-bottom': calculatedSize.padding[1],
            gap: calculatedSize.gap
        }"
    >
        <Icon 
            v-if="iconLeft"
            :name="iconLeft" 
            class="button__icon"
            :size="calculatedSize.icon"
        />
        <div 
            v-if="!isEmpty"
            class="button__content"
            :style="{
                gap: calculatedSize.gap
            }"
        >
            <slot/>
        </div>
        <Icon 
            v-if="iconRight"
            :name="iconRight" 
            class="button__icon"
            :size="calculatedSize.icon"
        />
        <div class="button__loading">
            <Loading :style="{'--size': Number(calculatedSize.icon)/10 + 'rem'}"/>
        </div>
    </Component>
</template>

<script setup>
    const props = defineProps({
        to: [String, Object],
        iconLeft: String,
        iconRight: String,
        iconSize: [String, Number],
        type: { // primary / secondary
            type: String, 
            default: 'primary'
        },
        size: { // extra-large / large / normal / small / extra-small
            type: String,
            default: 'normal'
        },
        disabled: Boolean,
        loading: Boolean,
    })

    const component = computed(()=>
        props.to?defineNuxtLink({}):'div'
    )

    const calculatedSize = computed(()=>
        props.size == "extra-large"?
            {
                text: 'font-16',
                icon: '24',
                padding: ['4.7rem', '1.9rem'],
                gap: '.8rem'
            }:
        props.size == "large"?
            {
                text: 'font-16',
                icon: '24',
                padding: ['3.1rem', '1.5rem'],
                gap: '.8rem'
            }:
        props.size == "normal"?
            {
                text: 'font-16',
                icon: '24',
                padding: ['3.1rem', '1.1rem'],
                gap: '.4rem'
            }:
        props.size == "small"?
            {
                text: 'font-14',
                icon: '16',
                padding: ['2.3rem', '1.1rem'],
                gap: '.4rem'
            }:
        props.size == "extra-small"?
            {
                text: 'font-12',
                icon: '12',
                padding: ['1.9rem', '.9rem'],
                gap: '.4rem'
            }:{}
    )

//empty
    const slots = useSlots();
    const isEmpty = computed(()=>!slots.default); 
</script>

<style lang="scss" scoped>
    .button{
        --color: var(--white);
        --color-hov: var(--orange-100);
        --color-disabled: var(--white);

        --background: var(--orange-100);
        --background-hov: var(--white);
        --background-disabled: var(--orange-30);

        --brd: var(--orange-100);

        --gap: .4rem;
        --rad: 2.4rem;

        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        width: max-content;
        border-radius: var(--rad);
        transition: .3s;
        position: relative;

        padding: 1.4rem 4rem;

        flex-shrink: 0;

        background: var(--background);
        border: .1rem solid var(--brd);
        color: var(--color);

        gap: var(--gap);

        &--secondary{
            --color: var(--orange-100);
            --background: var(--white);
            --color-hov: var(--white);
            --background-hov: var(--orange-100);
        }

        &--disabled{
            pointer-events: none;
            background: var(--background-disabled);
            border-color: var(--background-disabled);
            color: var(--color-disabled);
        }

        &--round{
            --rad: 50%;
        }

        //hover
            @media (hover: hover){
                &:hover{
                    background: var(--background-hov);
                    color: var(--color-hov);
                }
            }

        //active
            &::after{
                @include pseudo-absolute;
                @include all-directions(-.2rem);
                border: .1rem var(--background) solid;
                opacity: .5;
                pointer-events: none;
                border-radius: var(--rad);
                transition: .3s;
            }

            &:not(:active){
                &::after{
                    opacity: 0;
                }
            }

            &:active{
                border-color: var(--white);
                transition: .01s;
            }

        &__content{
            display: flex;
            gap: var(--gap);
            align-items: center;
        }

        &__loading{
            position: absolute;
            @include all-directions(0);
            @include flex-c;

            .loading{
                --color: var(--color);
            }
        }

        &--loading{
            pointer-events: none;

            .icon,
            .button__content
            {
                @include hidden(0);
            }
        }

        &:not(&--loading){
            .button__loading{
                @include hidden(0);
            }
        }
    }
</style>