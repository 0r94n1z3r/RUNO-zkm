<template>
    <HomeWrapper 
        class="benefits"
        title="Почему покупать запчасти в ZKM выгодно?"
    >
        <p class="benefits__subtitle font-18">
            В нашей компании работают опытные и ответственные специалисты, 
            которые отлично знают свою работу и разбираются во всех деталях отрасли.
        </p>
        <div class="benefits__cards">
            <Card class="benefits-card" :hov="false">
                <SvgIcon class="benefits-card__icon" name="benefits/briefcase"/>
                <h5 class="benefits-card__title">Многолетний опыт</h5>
                <p class="benefits-card__text">Мы стремимся поддерживать надежность и долгосрочность сотрудничества с клиентами, которые всегда помогали нам становиться лучше и учили определять свои предпочтения</p>
            </Card>
            <Card class="benefits-card" :hov="false">
                <SvgIcon class="benefits-card__icon" name="benefits/presentation"/>
                <h5 class="benefits-card__title">Высокое качество</h5>
                <p class="benefits-card__text">Все товары, поставляемые нашей компанией, производятся на передовых современных Российских, Европейских и Азиатских предприятиях и соответствуют всем международным стандартам</p>
            </Card>
            <Card class="benefits-card" :hov="false">
                <SvgIcon class="benefits-card__icon" name="benefits/wallet"/>
                <h5 class="benefits-card__title">Выгодные цены</h5>
                <p class="benefits-card__text">Прямые поставки от Российских, Европейских и Азиатских поставщиков, широкий ассортимент и наличие на складах, доставка до терминалов транспортных компаний, отгрузки в выходные и праздничные дни, гибкие условия оплаты</p>
            </Card>
            <Card class="benefits-card" :hov="false">
                <SvgIcon class="benefits-card__icon" name="benefits/package"/>
                <h5 class="benefits-card__title">Гарантии</h5>
                <p class="benefits-card__text">Гарантия заводов производителей. Гарантийное и послегарантийное обслуживание, возможность замены претензионной продукции в день обращения</p>
            </Card>
        </div>
    </HomeWrapper>
</template>

<script setup>

</script>

<style lang="scss" scoped>
    .benefits{
        --mb: 8rem;

        &__subtitle{
            margin-bottom: 4rem;
            max-width: 77rem;
        }

        &__cards{
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 3rem;

            @media (max-width: $navigation-mobile) {
                grid-template-columns: repeat(2, 1fr);
            }

            @media (max-width: $mobile) {
                grid-template-columns: 1fr;
            }
        }
    }

    .benefits-card{
        padding: 1.6rem;

        &__icon{
            width: 4.8rem;
            height: 4.8rem;
            margin-bottom: 2rem;
            color: var(--orange-100);
            display: block;
        }

        &__title{
            margin-bottom: 1.2rem;
        }
    }

    @media (max-width: $mobile) {
        .benefits{
            &__subtitle{
                @include font-16;
                margin-bottom: 2.4rem;
            }

            &__cards{
                gap: var(--pad);
            }
        }

        .benefits-card{

            &__title{
                @include font-h6;
                margin-bottom: 1.6rem;
            }

            &__text{
                @include font-14;
            }
        }
    }
</style>