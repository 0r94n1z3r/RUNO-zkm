<template>
    <NuxtLayout
        name="user"
        title="Личные данные"
    >
        <Card 
            v-if="useUser().info"
            class="profile-form"
            :hov="false"   
        >
            <div class="profile-form__blocks">
                <div class="profile-form__block">
                    <h3>Контактные данные</h3>
                    <div class="profile-form__contacts profile-form__block-content">
                        <TextInput 
                            placeholder="Телефон"
                            v-model="useUser().info.tel"
                            :mask="GLOBAL_PhoneMask"
                            @update:modelValue="edit({tel: $event}, 'tel')"
                        />
                        <!-- notdone? Подтверждение? -->
                        <TextInput 
                            placeholder="E-mail"
                            v-model="useUser().info.email"
                            @update:modelValue="edit({email: $event}, 'email')"
                        />
                        <TextInput 
                            placeholder="Имя"
                            v-model="useUser().info.first_name"
                            @update:modelValue="edit({'first_name': $event}, 'first_name')"
                        />
                        <TextInput 
                            placeholder="Фамилия"
                            v-model="useUser().info.last_name"
                            @update:modelValue="edit({'last_name': $event}), 'last_name'"
                        />
                    </div>
                </div>
                <div class="profile-form__block">
                    <h3>Адрес доставки</h3>
                    <div class="profile-form__address profile-form__block-content" v-if="addr">
                        <TextInput 
                            placeholder="Населенный пункт"
                            v-model="addr.city"
                            @update:modelValue="updateAddress"
                        />
                        <TextInput 
                            placeholder="Улица"
                            v-model="addr.street"
                            @update:modelValue="updateAddress"
                        />
                        <TextInput 
                            placeholder="Дом"
                            v-model="addr.house"
                            @update:modelValue="updateAddress"
                        />
                        <TextInput 
                            placeholder="Корпус"
                            v-model="addr.housing"
                            @update:modelValue="updateAddress"
                        />
                        <TextInput 
                            placeholder="Подъезд"
                            v-model="addr.entrance"
                            @update:modelValue="updateAddress"
                        />
                        <TextInput 
                            placeholder="Квартира"
                            v-model="addr.flat"
                            @update:modelValue="updateAddress"
                        />
                        <TextInput 
                            placeholder="Этаж"
                            v-model="addr.floor"
                            @update:modelValue="updateAddress"
                        />
                    </div>
                </div>
            </div>
            <hr>
            <div class="profile-form__blocks">
                <div class="profile-form__block" v-if="org">
                    <h3>Реквизиты</h3>
                    <div class="profile-form__org profile-form__block-content">
                        <TextInput 
                            placeholder="Наименование организации"
                            v-model="org.organization"
                            @update:modelValue="updateOrg"
                        />
                        <TextInput 
                            placeholder="ИНН"
                            v-model="org.tax_payer_id"
                            @update:modelValue="updateOrg"
                            mask="##########"
                        />
                        <TextInput 
                            placeholder="КПП"
                            v-model="org.registration_code"
                            @update:modelValue="updateOrg"
                            mask="#########"
                        />
                        <TextInput 
                            placeholder="Контактное лицо"
                            @update:modelValue="updateOrg"
                            v-model="org.manager_name"
                        />
                    </div>
                </div>
                <div class="profile-form__block" v-if="org">
                    <h3>Юридический адрес</h3>
                    <div class="profile-form__org-address profile-form__block-content">
                        <TextInput 
                            placeholder="Населенный пункт"
                            v-model="org.legal_locality"
                            @update:modelValue="updateOrg"
                        />
                        <TextInput 
                            placeholder="Улица"
                            v-model="org.legal_street"
                            @update:modelValue="updateOrg"
                        />
                        <TextInput 
                            placeholder="Дом"
                            v-model="org.legal_house_number"
                            @update:modelValue="updateOrg"
                        />
                        <TextInput 
                            placeholder="Корпус"
                            v-model="org.legal_building"
                            @update:modelValue="updateOrg"
                        />
                        <TextInput 
                            placeholder="Офис"
                            v-model="org.legal_apartment"
                            @update:modelValue="updateOrg"
                        />
                    </div>
                </div>
            </div>

            <div class="profile-form__blocks">
                <div class="profile-form__buttons">
                    <Button
                        type="secondary"
                    >
                        <!-- notdone -->
                        Сменить пароль
                    </Button>
                </div>
            </div>
        </Card>
    </NuxtLayout>
</template>

<script setup>
    definePageMeta({
        name: 'Profile',
        private: true,
        nav: 'User'
    })

    //addr
        const addr = computed(()=>
            useUser().info.addresses?.[0]
        )

        const updateAddress = () => {
            edit({'addresses': useUser().info.addresses}, 'address')       
        }

    //org
        const org = computed(()=> 
            useUser().info.orgs?.[0]
        )

        const updateOrg = () => {
            editBusiness(org.value); 
        }


    //edit
        let debounces = [];

        //notdone переписать адекватно - выделить debounce в отдельный метод с колбэком

        const edit = (body, key) => {
            if(debounces[key])clearTimeout(debounces[key]);
            debounces[key] = setTimeout(()=>{
                useAPI(
                    '/lk/users/profile',
                    {
                        method: 'POST',
                        body
                    }
                );
            },500);
        }

        //business
            const editBusiness = async (body)=>{
                if(debounces['org'])clearTimeout(debounces['org']);
                debounces['org'] = setTimeout( async ()=>{

                    let toSend = unlink(body)
                    Object.keys(toSend).forEach(k => { if(toSend[k] == "")toSend[k] = "EMPTY_VALUE"; })

                    const fetched = await useAPI(
                        `/lk/user_orgs/${useUser().info.orgs[0].id}`,
                        {
                            method: 'POST',
                            body: toSend
                        }
                    )

                    console.log(fetched);
                }, 500);
            }

    
</script>

<style lang="scss" scoped>
    .profile-form{
        padding: 2.4rem;
        @include flex-col;
        gap: 4rem;

        h3{
            margin-bottom: 3.2rem;
        }

        &__blocks{
            display: grid;
            gap: 4rem 3rem;
            grid-template-columns: 5fr 7fr;
        }

        &__block-content{
            display: grid;
            gap: 2.4rem 1.6rem;
        }

        &__address{
            grid-template-columns: repeat(6, 1fr);

            .text-input{
                grid-column: span 2;
            
                &:nth-child(1),
                &:nth-child(2){
                    grid-column: 1/-1;
                }

                &:nth-child(3),
                &:nth-child(4){
                    grid-column: span 3;
                }
            }

        }

        &__org{
            grid-template-columns: repeat(2, 1fr);

            .text-input{
                &:first-child,
                &:last-child{
                    grid-column: 1/-1;
                }
            }
        }

        &__org-address{
            grid-template-columns: repeat(3, 1fr);

            .text-input{
                &:nth-child(1),
                &:nth-child(2){
                    grid-column: 1/-1;
                }
            }
        }

        &__buttons{
            display: flex;
            justify-content: end;
            gap: .8rem 1.6rem;
            grid-column: 2/-1;
            min-width: 0;
        }

        @media (max-width: 1080px) {
            &__blocks{
                grid-template-columns: 1fr;
            }
        }

        @media (max-width: 900px) {
            &__buttons{
                grid-column: 1/-1;

                .button{
                    width: 100%;
                }
            }
        }
    }
</style>