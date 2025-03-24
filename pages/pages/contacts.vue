<template>
    <div class="contacts">
        <Head>
            <Title>Контакты ЗКМ Гидро в Москве</Title>
            <Meta name="description" content="Контакты и реквизиты компании ЗКМ в Москве" />
        </Head>

        <Breadcrumbs
            :list="[{title: 'Контакты'}]"
        />

        <PageTitle title="Каталог товаров"/>

        <div class="contacts__content-wr content-wrapper">
            <div class="contacts__content">
                <div class="contacts__block">
                    <p><span>Адрес:</span> {{ useStatic().contacts.address }} </p>
                    <p><span>Время работы:</span> ПН - ВС: c 9:00 до 21:00</p>
                    <p><span>E-mail:</span> <a class="text-link text-link--rev" :href="`mailto:${useStatic().contacts.email}`">{{ useStatic().contacts.email }}</a></p>
                    <p><span>Телефон:</span> <a class="text-link text-link--rev":href="`tel:${useStatic().contacts.tel}`">{{ useStatic().contacts.tel }}</a></p>
                </div>

                <h3>Банковские реквизиты</h3>
                <div class="contacts__block">
                    <p><span>ИНН:</span> 2703128937</p>
                    <p><span>КПП:</span> 281301901</p>
                    <p><span>р/с:</span> 40908160921070000681 в АО "АЛЬФА-БАНК", г. Москва</p>
                    <p><span>к/с:</span> 30121910100000000668</p>
                    <p><span>БИК:</span> 091812880</p>
                </div>

                <h3>Обратная связь</h3>
                <FeedbackForm />
            </div>
            <div class="contacts__map-wr">
                <ContactsMap/>
                <div class="contacts__files">
                    <DocumentLink 
                        v-for="i in [
                            {
                                title: 'Официальный дилер OMT Group на территории России',
                                url: '/certificates/omt.pdf',
                            },
                            {
                                title: 'Официальный дилер Rekith Hydraulic на территории России',
                                url: '/certificates/rekith.pdf',
                            },
                        ]"
                        :title="i.title"
                        :url="i.url"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

    //map
        const addr = {
            lat: 55.572885,
            lon: 37.617769, 
        }
</script>

<style lang="scss" scoped>
    .contacts{
        &__content-wr{
            display: flex;
            gap: 4rem 3rem;
        }

        &__content{
            width: 100%;
        }

        &__map-wr{
            width: 100%;
            max-width: 57rem;
            @include flex-col;
            gap: 1.6rem
        }

        &__files{
            @include flex-col;
            gap: 1.2rem;
        }

        &__block{
            @include flex-col;
            gap: 2rem;
            margin-bottom: 6rem;

            p{
                display: flex;
                align-items: baseline;
                gap: .5em;

                span{
                    @include font-h5;
                    white-space: nowrap;
                }
            }
        }

        h3{
            margin-bottom: 3.2rem;
        }

        @media (max-width: $navigation-mobile) {

            &__content-wr{
                display: flex;
                flex-direction: column-reverse;
            }

            &__block{
                margin-bottom: 4rem;

                p{
                    @include font-14;

                    span{
                        @include font-h6;
                    }
                }
            }

            h3{
                @include font-h4;
                margin-bottom: 2.4rem;
            }
        }

    }

    .contacts-map{
        position: relative;
        display: block;
        border-radius: .8rem;
        overflow: hidden;
        box-shadow: 0 0 .8rem 0 rgba(14, 31, 53, 0.16);

        &__pin{
            position: absolute;
            @include all-directions(0);
            margin: auto;
            height: 4rem;
            width: 2.8rem;
            transform: translateY(-100%);
            color: var(--orange-100)
        }

        &__text{
            position: absolute;
            bottom: 0;
            left: 0;
            padding: .4rem;
            background: #ffffff88;
        }
    }
</style>