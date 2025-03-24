<template>
    <div class="pp-aside">
        <Card class="pp-aside__card" :hov="false">
            <ProdCardChips class="desk-visible" :="{info}" :optimize-view="false"/>
            <PP-Actions class="mob-visible" :="{info}" />
            <h5 class="mob-visible">{{ info.title }}</h5>

            <div class="pp-aside__price-wr">
                <ProdCardPrice :="{info}" />
                <ProdCardAvailability :="{info}" />
            </div>
            <div class="pp-aside__cart-btn-wr">
                <ProdCardButton full :="{info}"/>
                <Button 
                    v-if="useCart().product(info.id)?.count"
                    to="/cart"
                >
                    Оформить
                </Button>
            </div>
        </Card>

        <Card class="pp-aside__card" :hov="false" v-if="!HIDE.delivery">
            <div class="pp-delivery">
                <Icon class="pp-delivery__icon" name="map-pin" size="16"/>
                <p><span>Самовывоз:</span> сегодня, 0 ₽</p>
            </div>
            <div class="pp-delivery">
                <Icon class="pp-delivery__icon" name="truck" size="16"/>
                <p><span>Доставка:</span> завтра, от 300 ₽</p>
            </div>
        </Card>

        <Card class="pp-aside__card" :hov="false">
            <div class="pp-benefit">
                <SvgIcon class="pp-benefit__icon" name="benefits/exchange"/>
                <p>Обмен в день обращения</p>
            </div>
            <div class="pp-benefit">
                <SvgIcon class="pp-benefit__icon" name="benefits/courier"/>
                <p>Отправка курьером через Яндекс Такси</p>
            </div>
            <div class="pp-benefit">
                <SvgIcon class="pp-benefit__icon" name="benefits/delivery"/>
                <p>Бесплатная доставка до терминала транспортной компании</p>
            </div>
            <div class="pp-benefit">
                <SvgIcon class="pp-benefit__icon" name="benefits/payment"/>
                <p>Оплата через банковские приложения</p>
            </div>
        </Card>

        <p class="pp-aside__disclaimer">
            * Уважаемые клиенты, в связи с нестабильным курсом валют возможны изменения цен на некоторые товары. Стоимость уточняйте по телефону 
            <a :href="`tel:${useStatic().contacts.tel}`" class="text-link--basic">{{ useStatic().contacts.tel }}</a>
        </p>

        <div class="pp-aside-files desk-visible">
            <DocumentLink 
                v-for="i in info.documents"
                :title="i.title"
                :url="i.url"
            />
        </div>
    </div>
</template>

<script setup>
    import HIDE from '@/hide-config.json';

    const props = defineProps({
        info: Object
    })
</script>

<style lang="scss" scoped>
    .pp-aside{
        --gap: 1.6rem;
        @include flex-col;
        gap: var(--gap);

        :deep(.card){
            padding: 1.6rem;
            @include flex-col;
            gap: var(--gap);
            box-shadow: 0 0 8px 0 rgba(14, 31, 53, 0.16);
        }

        :deep(.prod-card-price){
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: start;
            flex-direction: row-reverse;
            gap: .2rem 1.6rem;

            .prod-card-price{
                &__current{
                    @include font-h3;
                    color: var(--black-100)!important;
                }

                &__old{
                    @include font-h5;
                }
            }
        }

        &__price-wr{
            @include flex-col;
            gap: .8rem;
        }

        &__cart-btn-wr{
            display: flex;
            gap: .8rem;

            .button{
                @include padding-x(1.6rem!important);
            }
        }

        &__disclaimer{
            font-size: 1rem;
            line-height: 1.4rem;
            color: var(--black-60);
        }
    }

    .pp-delivery{
        display: flex;
        align-items: center;
        gap: .8rem;
        @include font-14;

        &__icon{
            color: var(--orange-100);
        }

        span{
            font-weight: 700;
            text-decoration: underline dashed .1rem;
        }
    }

    .pp-benefit{
        display: flex;
        align-items: center;
        gap: 1.6rem;
        @include font-12;

        :deep(.pp-benefit__icon){
            width: 2.4rem;
            height: 2.4rem;
            flex-shrink: 0;
        }
    }

    .pp-aside-files{
        margin-top: 2.4rem;
        @include flex-col;
        gap: 1.6rem;
    }

    @include mob-display(800px);

    @media (max-width: 800px){
        .pp-aside{
            &__card{
                gap: 1.2rem;
            }
        }
    }

    :deep(.pp-actions){
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        gap: .8rem 1.6rem;

        .pp-action--copy{
            display: none;
        }
    }
</style>