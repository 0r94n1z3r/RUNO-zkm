<template>
    <div class="empty content-wrapper">
        <div v-if="icon" class="empty__icon">
            <Icon :name="icon" :size="iconSize"/>
        </div>
        <div class="empty__texts">
            <h5 v-if="title" class="empty__title">{{title}}</h5>
            <p v-if="text" class="empty__text">{{text}}</p>
        </div>
        <Button
            v-if="button"
            class="empty__btn"
            type="secondary"
            :to="to"
        >
            {{button}}
        </Button>
        <slot/>
    </div>
</template>

<script setup>
    const props = defineProps({
        icon: String,
        iconSize: {
            type: [Number, String],
            default: 24
        },
        title: String,
        text: String,
        button: String,
        to: String
    })
</script>

<style lang="scss" scoped>
    .empty{
        @include flex-col;
        align-items: center;
        gap: 2.4rem;
        max-width: 68rem;
        margin-bottom: 6rem;

        &__icon{
            @include flex-c;
            height: 7.2rem;
            width: 7.2rem;
            background: var(--white);
            border-radius: 50%;
            border: .2rem solid var(--orange-100);
            color: var(--orange-100);

            .icon{
                --icon-size: 2.4rem;
            }
        }

        &__texts{
            text-align: center;

            h5{
                margin-bottom: 1.6rem;
            }
        }
    }
</style>