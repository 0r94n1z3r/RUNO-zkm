<template>
    <div 
        class="prod-card-button"
        :class="[
            `prod-card-button--${number?'num':'zero'}`,
            full && 'prod-card-button--full',
        ]" 
        @click.self.prevent
    >
        <template v-if="!number">
            <Button
                v-if="full"
                class="prod-card-button__button prod-card-button__button--zero" 
                @click.prevent="add"
            >
                {{emptyTitle}}
            </Button>
            <Button 
                v-else
                class="prod-card-button__button prod-card-button__button--zero" 

                icon-left="shopping-cart" 
                size="small"
                type="secondary"

                @click.prevent="add"
            />
        </template>
        <div 
            v-show="number" 
            class="prod-card-button__button prod-card-button__button--num"
            @click.self.prevent
        >
            <div class="prod-card-button__action" @click.prevent="subtract">-</div>
            <p class="prod-card-button__num" @click.prevent>{{number}}</p>
            <p class="prod-card-button__num prod-card-button__num--fake" @click.prevent>{{'8'.repeat(String(number).length)}}</p>
            <div class="prod-card-button__action" @click.prevent="add">+</div>
        </div>
    </div>
   
</template>

<script setup>
    const props = defineProps({
        info: Object,
        isCart: {
            type: Boolean,
            default: true
        },
        full: Boolean,   
        emptyTitle: {
            type: String,
            default: "В корзину"
        },
    })

    const emit = defineEmits(['changeAmount']);

    const number = computed(()=>Number((props.info?.count ?? useCart().product(props.info?.id)?.count) || 0));
    
    const add = ()=>{
        emit('changeAmount', number.value+1);

        if(props.isCart)
            useCart().changeAmount(props.info, number.value+1);
    }

    const subtract = ()=>{
        emit('changeAmount', number.value-1);

        if(props.isCart)
            useCart().changeAmount(props.info, number.value-1);
    }

</script>

<style lang="scss" scoped>
    .prod-card-button{
        &__button{
            position: relative;
            display: flex;
            user-select: none;
        }

        &--num{
            color: var(--orange-100);
            width: max-content;

            .prod-card-button{
                &__button{
                    gap: .4rem;
                    background: var(--white);
                    border: .1rem solid var(--orange-100);
                    align-items: center;
                    border-radius: 4rem;
                    justify-content: space-between
                }

                &__action{
                    @include flex-c;
                    height: 3.8rem;
                    width: 3.8rem;
                    border-radius: 50%;
                    transition: .3s;
                    cursor: pointer;

                    &:active{
                        transition: .01s;
                        background: var(--orange-20)
                    }
                }
            }
        }

        &__num{
            &:not(&--fake){
                position: absolute;
                @include all-directions(0);
                width: max-content;
                height: max-content;
                margin: auto;
            }

            &--fake{
                color: transparent;
                pointer-events: none;
            }
        }

        &--full{
            width: 100%;

            &.prod-card-button{
                &--num{
                    width: 100%;
                }

                .prod-card-button{
                    &__button{
                        height: 4.8rem;
                        justify-content: space-around
                    }
                }
            }

            .prod-card-button{
                &__button{
                    width: 100%;
                }
            }
        }
    }
</style>