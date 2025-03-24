<template>
    <div class="desk-top-header font-14">
        <div class="content-wrapper desk-top-header__container">
            <a 
                class="desk-top-header__item text-link--basic" 
                href="https://yandex.eu/maps/-/CDhIrB16" 
                target="_blank"
            >
                {{ useStatic().contacts.address }}
            </a>
            <div class="desk-top-header__item">
                <Icon name="clock" size="16"/>
                {{ useStatic().contacts.time }}
            </div>
            <a 
                class="desk-top-header__item text-link--basic" 
                :href="`mailto:${useStatic().contacts.email}`"
            >
                <Icon name="mail" size="16"/>
                {{ useStatic().contacts.email }}
            </a>
            <a  
                class="desk-top-header__item text-link--basic font-14"
                :href="`tel:${useStatic().contacts.tel}`"
            >
                <Icon name="phone-call" size="16"/>
                <p class="font-h7">{{ useStatic().contacts.tel }}</p>
            </a>
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
    .desk-top-header{
        padding: 1.6rem 0;
        border-bottom: .1rem solid var(--black-10);

        &__container{
            display: flex;
            justify-content: end;
            gap: 1.2rem 2.4rem;

            a{
                @include virtual-area(.6rem)
            }

            .desk-top-header__item{
                display: flex;
                gap: .8rem;
                align-items: center;
            }
        }
    }
</style>