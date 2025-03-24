<template>
    <Card 
        class="category-card"
        :class="{'category-card--hor': hor}"
        :to="link"
    >
        <div class="category-card__container" v-if="info">
            <Image
                class="category-card__image"
                :src="info.cover_url"
                size="160"
            />
            <div class="category-card__title">
                <p class="font-16">
                    {{ info.title }}
                </p>
            </div>
        </div>
    </Card>
</template>

<script setup>
    const props = defineProps({
        info: Object,
        hor: Boolean,
        to: [String, Object]
    });

    const link = computed(()=>props.to || `/catalog/${props.info?.name}`);

</script>

<style lang="scss" scoped>
    .category-card{
        display: block;
        overflow: hidden;
        max-width: 100%;

        &__container{
            display: flex;
            padding: 1rem;
            gap: 1.2rem 1.6rem;
        }

        &__title{
            height: 100%;
            min-height: 6rem;
            
            min-width: 0;

            p{
                overflow: hidden;
                text-overflow: ellipsis;
                word-break: normal;
            }
        }

        &:not(&--hor){
            .category-card{
                &__container{
                    flex-direction: column;
                }

                &__image{
                    width: 100%;
                    height: 14rem;
                }

                &__title{
                    text-align: center;
                    min-height: 6rem;

                    h5{
                        width: 100%;
                        min-height: 2.667em;
                        min-height: 2lh;
                        display: flex;
                        justify-content: center;
                        align-items: end;
                    }
                }
            }
        }

        &--hor{
            .category-card{
                &__container{
                    padding: 1.2rem;
                }

                &__image{
                    width: 14rem;
                    min-width: 14rem;
                    min-height: 8rem;
                }

                &__title{
                    display: flex;
                    align-items: center;
                    align-self: center
                }
            }
        }

        @media (max-width: $mobile) {
            &__container{
                gap: .8rem 1.6rem;
            }
        
            &__title{
                p{
                    @include font-14;
                }
            }

            &:not(&--hor){
                .category-card{
                    &__image{
                        height: 12rem;
                    }
                    
                    &__title{
                        min-height: unset;
                    }
                }
            }

            &--hor{
                .category-card{
                    &__image{
                        min-width: unset;
                        width: 12rem;
                    }
                }
            }
        } 
    }
</style>