<template>
    <div class="prod-card-props">
        <div class="prod-card-prop" v-for="i in list?.slice(0, limit)">
            <div class="prod-card-prop__spacer"></div>

            <!-- title -->
                <div class="prod-card-prop__title"><span>{{ i.title }}</span></div>

            <!-- value -->
                <Placeholder 
                    v-if="i.loading"
                    type="bar"
                />
                <div v-else-if="!i.href" class="prod-card-prop__value"><span>{{ i.value }}</span></div>
                <NuxtLink 
                    v-else
                    class="prod-card-prop__value text-link text-link--rev"
                    :to="i.href"
                >
                    <span>{{ i.value }}</span>
                </NuxtLink>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        limit: {
            type: Number,
            default: 3
        },
        info: Object,
        hasBrand: Boolean
    })

    const list = computed(()=>{
        if(!props.info)return [];

        const attrs = props.info.attributes || props.info?.primary_attributes || [];

        let res = attrs?.map(e => ({
            title: e.property?.title,
            loading: e.loading,
            value: e.value,
            href: e.href,
        }))

        if(props.hasBrand && props.info?.brand_id){
            res.unshift(
                {
                    title: 'Бренд',
                    loading: useBrands().initLoading,
                    value: useBrands().brand(props.info?.brand_id)?.title, 
                    href: useBrands().link(props.info?.brand_id, 'id')
                }
            );
        }

        return res;

    })
</script>


<style lang="scss" scoped>
    .prod-card-props{
        --attr-background: var(--gray-5);

        @include flex-col;
        gap: .8rem;
    }
    
    .prod-card-prop{
        display: flex;
        gap: .4rem;
        align-items: baseline;
        min-width: 0;
        position: relative;
        @include flex-jtf;
        @include font-14;

        &__title,
        &__value{
            flex-shrink: 0;
            max-width: 55%;

            &:not(.text-link){
                width: 100%;
            }

            word-break: break-word;
            position: relative;
            // min-width: 25%;

            span{
                background: var(--attr-background);
                @include virtual-area(.4rem);
                padding-top: .1rem;
                padding-bottom: .2rem;
                box-decoration-break: clone;
                -webkit-box-decoration-break: clone;
            }
            
            &:last-child{
                text-align: end;
            }
        }

        &__title{
            color: var(--gray-100);
        }

        &__value{
            text-align: end;
            max-width: 45%;
        }

        &__spacer{
            border-bottom: .1rem dashed var(--black-20);
            pointer-events: none;

            width: 100%;
            height: 1.8rem;
            height: 1lh;
            position: absolute;
        }

        :deep(.text-link::after){
            bottom: 0rem;
        }
    }

    
</style>