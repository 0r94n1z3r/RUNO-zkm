<template>
    <div class="prod-card-props">
        <div class="prod-card-prop" v-for="i in list?.slice(0, limit)">
            <div class="prod-card-prop__spacer"></div>

            <!-- title -->
                <Placeholder 
                    v-if="i.loading"
                    type="bar"
                />
                <p
                    v-else 
                    class="prod-card-prop__title"
                    :to="i.href"
                >
                    <span>{{ i.title }}</span>
                </p>

            <!-- values -->
                <Placeholder 
                    v-if="i.loading"
                    type="bar"
                />
                <div v-else class="prod-card-prop__list">
                    <p
                        v-for="a in i.values"
                        class="prod-card-prop__value"
                        :to="a.href"
                    >
                        <span>{{ a.title }}</span>
                    </p>
                </div>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        limit: {
            type: Number,
            default: 3
        },
        info: Object
    })

    const list = computed(()=>props.info.applications.map( e => ({
        title: e.title,
        href: '',
        values: e.models.map( m => (
            {title: m.title, href: ''}
        )),   
        loading: false,
    })))
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

            word-break: break-word;
            position: relative;

            span{
                background: var(--attr-background);
                @include virtual-area(.4rem);
                box-decoration-break: clone;
                -webkit-box-decoration-break: clone;
                @include text-overflow;
            }
            
            &:last-child{
                text-align: end;
            }
        }

        &__title{
            color: var(--gray-100);
            line-height: 1.8rem;
            max-width: 55%;
        }

        &__list{
            display: flex;
            flex-wrap: wrap;
            gap: .8rem;
            max-width: 45%;
            justify-content: end;
        }
        
        &__value{
            text-align: end;


            span{
                display: block;
            }

            &:not(:last-child){
                span::after{
                    content: ',';
                }
            }
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
            bottom: -0rem;
        }
    }
</style>