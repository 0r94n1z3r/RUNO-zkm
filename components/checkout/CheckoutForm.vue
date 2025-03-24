<template>
    <Card   
        class="checkout-form"
        :hov="false"
    >
        <div class="checkout-form__block">
            <h3>Контактные данные</h3>
            <div class="checkout-form__contacts">
                <TextInput 
                    placeholder="E-mail"
                    v-model="data.email"
                    :error="errors.email"
                    required
                />
                <TextInput 
                    placeholder="Телефон"
                    v-model="data.tel"
                    :mask="GLOBAL_PhoneMask"
                    :error="errors.tel"
                    required
                />
                <TextInput 
                    placeholder="Имя"
                    v-model="data.first_name"
                    :error="errors.first_name"
                    required
                />
                <TextInput 
                    placeholder="Фамилия"
                    v-model="data.last_name"
                    :error="errors.last_name"
                />
            </div>
            <Checkbox 
                v-if="useUser().info"
                v-model="data.isUpdateData"
                title="Обновить контактные данные в профиле"
            />
        </div>

        <div class="checkout-form__block">
            <h3>Тип клиента</h3>
            <div class="checkout-form__checkboxes">
                <Checkbox 
                    class="checkout-form__checkbox"
                    v-for="i in types" 
                    type="radio"
                    :title="i.title"
                    v-model="i.value"
                    :radio-list="types"
                    @change="data.user_type = i.id"
                ></Checkbox>
            </div>
        </div>

        <div class="checkout-form__block" v-if="data.user_type == 1">
            <h3>Данные юридического лица</h3>

            <div class="checkout-form__org">
                <TextInput 
                    placeholder="Наименование организации"
                    v-model="data.organization"
                />
                <TextInput 
                    placeholder="ИНН"
                    v-model="data.tax_payer_id"
                    @update:modelValue="updateOrg"
                    mask="##########"
                />
                <TextInput 
                    placeholder="КПП"
                    v-model="data.registration_code"
                    mask="#########"
                />
                <TextInput 
                    placeholder="Контактное лицо"
                    v-model="data.manager_name"
                />

                <hr>

                <TextInput 
                    placeholder="Населенный пункт"
                    v-model="data.legal_locality"
                />
                <TextInput 
                    placeholder="Улица"
                    v-model="data.legal_street"
                />
                <TextInput 
                    placeholder="Дом"
                    v-model="data.legal_house_number"
                />
                <TextInput 
                    placeholder="Корпус"
                    v-model="data.legal_building"
                />
                <TextInput 
                    placeholder="Офис"
                    v-model="data.legal_apartment"
                />
            </div>
        </div>

        <div class="checkout-form__block">
            <h3>Дополнительно</h3>
            <div class="checkout-form__textarea-wr">
                <TextareaInput
                    v-model="data.comment"
                    placeholder="Комментарий"
                    :limit="100"
                />
            </div>
        </div>

        <div class="checkout-form__block" v-if="!HIDE.delivery">
            <h3>Доставка</h3>
            <div class="checkout-form__checkboxes">
                <Checkbox 
                    class="checkout-form__checkbox"
                    v-for="i in deliveries" 
                    type="radio"
                    :title="i.title"
                    v-model="i.value"
                    :radio-list="deliveries"
                    @change="data.delivery_type = i.id"
                ></Checkbox>
            </div>
        </div>

        <div class="checkout-form__block" v-if="!HIDE.delivery && data.delivery_type == 1">
            <h3>Адрес доставки</h3>
            
            <div class="checkout-form__address">
                <TextInput 
                    placeholder="Населенный пункт"
                    v-model="data.address.city"
                    :error="errors.delivery_city"
                    required
                />
                <TextInput 
                    placeholder="Улица"
                    v-model="data.address.street"
                    :error="errors.delivery_street"
                    required
                />
                <TextInput 
                    placeholder="Номер дома"
                    v-model="data.address.house"
                    :error="errors.delivery_house"
                    required
                />
                <TextInput 
                    placeholder="Корпус"
                    v-model="data.address.housing"
                    :error="errors.delivery_housing"
                    required
                />
                <TextInput 
                    placeholder="Подъезд"
                    v-model="data.address.entrance"
                    :error="errors.delivery_entrance"
                    required
                />
                <TextInput 
                    placeholder="Квартира"
                    v-model="data.address.flat"
                    :error="errors.delivery_flat"
                    required
                />
                <TextInput 
                    placeholder="Этаж"
                    v-model="data.address.floor"
                    :error="errors.delivery_floor"
                    required
                />
            </div>
        </div>

        <div class="checkout-form__block" v-if="!HIDE.payment">
            <h3>Способ оплаты</h3>
            <div class="checkout-form__checkboxes">
                <Checkbox 
                    class="checkout-form__checkbox"
                    v-for="i in payments" 
                    type="radio"
                    :title="i.title"
                    v-model="i.value"
                    :radio-list="payments"
                    @change="data.payment_type_id = i.id"
                ></Checkbox>
            </div>
        </div>   

        <div class="checkout-form__block checkout-form__checkboxes-block">
            <div class="checkout-form__checkboxes">
                <Checkbox 
                    v-model="isSpam"
                    title="Подписаться на новости и скидки"
                />
                <Checkbox 
                    v-model="data.privacy"
                >
                    Соглашаюсь с 
                    <NuxtLink 
                        class="text-link--basic text-link--rev" 
                        to="/pages/politika-obrabotki-personalnyh-dannyh" 
                        target="_blank" 
                    >
                        &nbsp;политикой обработки персональных данных
                    </NuxtLink>
                </Checkbox>
            </div>
        </div>     
    </Card>
</template>

<script setup>
    import HIDE from '@/hide-config.json';

    const props = defineProps({
        data: Object,
        errors: Object,
    })

    //type
        const types = ref([
            {title: 'Физическое лицо', id: 0, value: true},
            {title: 'Юридическое лицо', id: 1},
        ])

    //spam
        const isSpam = ref(true);

    //type
        const deliveries = ref([ // notdone (возможно нужно зафетчить)
            {title: 'Самовывоз', id: 0, value: true},
            {title: 'Курьерская служба доставки', id: 1}, // notdone? нужны ли адреса самовывоза?
        ])

    //payment
        const payments = ref([ // notdone (возможно нужно зафетчить)
            {title: 'Наличными или картой при получении', id: 0, value: true},
            {title: 'Картой онлайн', id: 1},
        ])


</script>

<style lang="scss" scoped>
    .checkout-form{
        --gap: 6rem;

        @include flex-col;
        padding: 2.4rem;
        gap: var(--gap);
        min-width: 0;

        h3{
            margin-bottom: 3.2rem;
        }

        &__contacts{
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2.4rem;
            margin-bottom: 2.4rem;
        }

        &__checkboxes{
            @include flex-col;
            gap: 1.2rem;
            @include font-14;
        }

        &__textarea-wr{
            padding-bottom: 1.6rem;
        }

        &__org{
            display: grid;
            gap: 2.4rem 1.6rem;

            grid-template-columns: repeat(6, 1fr);

            hr{
                grid-column: -1/1;
            }

            .text-input{
                grid-column: -1/1;

                &:nth-child(2),
                &:nth-child(3){
                    grid-column: span 3;
                }

                &:nth-child(8),
                &:nth-child(9),
                &:nth-child(10){
                    grid-column: span 2;
                }
            }
        }

        &__address{
            display: grid;
            gap: 2.4rem 1.6rem;
            grid-template-columns: repeat(4, 1fr);

            .text-input{
                &:first-child{
                    grid-column: 1/-1;
                }

                &:nth-child(2){
                    grid-column: 1/-2;
                }
            }
        }

        &__checkboxes-block{
            margin-top: calc(-1 * var(--gap));
            :deep(.checkbox__text){
                display: block;
            }
        }

        @media (max-width: $mobile) {
            padding: 1.6rem;
            --gap: 4rem;

            h3{
                margin-bottom: 2.4rem;
                @include font-h4;
            }

            &__contacts{
                grid-template-columns: 1fr;
            }
            
            &__address{
                grid-template-columns: repeat(6, 1fr);

                .text-input{
                    grid-column: span 2;

                    &:first-child{
                        grid-column: 1/-1;
                    }

                    &:nth-child(2){
                        grid-column: 1/-1;
                    }

                    &:nth-child(3),
                    &:nth-child(4){
                        grid-column: span 3;
                    }
                }
            }
        }
    }
</style>