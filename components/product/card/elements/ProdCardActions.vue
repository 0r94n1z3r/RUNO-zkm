<template>
    <div class="prod-card-actions">
        <Button
            v-for="i in itemsDisplay"
            class="prod-card-actions__btn"
            :class="{'prod-card-actions__btn--active': i.active}"

            :icon-left="i.active?i.icon.active:i.icon.default"

            size="small"
            type="secondary"

            @click.prevent="()=>{
                emit('action', i.name);
                i.action();
            }"
        >
            
        </Button>
    </div>
</template>

<script setup>
    const props = defineProps({
        info: Object,
        list: {
            type: Array,
            default: ['like']
        }
    })

    const emit = defineEmits('action');

//list
    const itemsList = computed(()=>[
        {
            name: 'like',
            icon: {
                default: 'heart',
                active: 'heart-filled'
            },
            active: useFavorites().isFav(props.info?.id),
            action(){likeHandler()}
        },
        {
            name: 'trash',
            icon: {
                default: 'trash',
            },
        }
    ])

    const itemsDisplay = computed(()=>props.list.map(e => itemsList.value.find(j => j.name == e)).filter(e=>e))

//handlers
    const likeishHandler = (cb)=>{
    
        if(!useUser().info){
            useUser().annoy();
            return;
        }

        cb(props.info);
    }

    const likeHandler = ()=>likeishHandler(
        ()=>useFavorites().switchFav(props.info)
    )

</script>

<style lang="scss" scoped>
    .prod-card-actions{
        display: flex;
        gap: .8rem;
        width: max-content;

        &__btn{


            &:not(&--active){
                --brd: var(--black-20);
                --color: var(--black-40);
            }

            @media (max-width: $mobile) {
                padding: .6rem!important;
            }
        }
    }
</style>