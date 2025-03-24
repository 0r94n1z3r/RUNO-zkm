<template>
    <div class="brands">
        <Breadcrumbs 
            class="breadcrumbs"
            :list="[{title: 'Бренды'}]"
        />

        <PageTitle title="Бренды" />

        <div 
            v-if="useBrands().initLoading"
            class="brands__columns brands__columns--preloader content-wrapper"
        >
            <div class="brands__placeholder" v-for="i in ['L','O','A','D','I','N','G']">
                <h3>{{ i }}</h3>
                <Placeholder v-for="k in Math.round(9*Math.random() + 1)"/>
            </div>
        </div>

        <div 
            v-else
            class="brands__columns content-wrapper"
        >
            <div 
                class="brand-column"
                v-for="(col,k) in useBrands().relevant.alphabetCols[colsNumber]"
                :key="k"
            >
                <div class="brand-column__item"
                    v-for="item in col.data"
                >
                    <h3>{{ item.key }}</h3>

                    <NuxtLink 
                        class="text-link text-label text-label--medium"
                        v-for="brand in item.data"
                        :to="useBrands().link(brand.name)"
                    >
                        <p>
                            {{ brand.title }}
                        </p>
                    </NuxtLink>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
    const colsNumber = computed(()=>{
        const w = useWindowSize().width.value;

        const n = Math.floor(w/180);

        return  n>6?
                    6:
                n<2?
                    2:
                n
    });
</script>

<style lang="scss" scoped>
    .brands{
        padding-top: 4.2rem;
        padding-bottom: 15rem;

        .breadcrumbs{
            margin-bottom: 2.4rem;
        }

        @media (max-width: $mobile) {
            padding-top: 2.4rem;

            .breadcrumbs {
                margin-bottom: 1.6rem;
            }
        }

        &__columns{
            display: flex;
            gap: var(--pad);
        }

        .brand-column{
            display: block;
            width: 100%;
            min-width: 0;

            &__item{
                min-width: 0;
                @include flex-col;
                gap: .8rem;

                h3{
                    margin-top: 3.2rem;
                    margin-bottom: .8rem;
                }

                .text-link{
                    --color: var(--black-100);
                    display: block;
                    min-width: 0;
                    max-width: 100%;
                    
                    p{
                        @include text-overflow;
                    }
                }
            }
        }

        &__columns--preloader{
            flex-wrap: wrap;
        }

        &__placeholder{
            margin-top: 3.2rem;
            width: 14.9rem;

            .placeholder{
                margin: 2rem 0;
            }
        }
    }
</style>