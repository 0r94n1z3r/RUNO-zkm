<template>
    <div class="checkout">
        <Breadcrumbs 
            :list="[
                {title: 'Корзина покупок', href: '/cart'},
                {title: 'Оформление заказа'},
            ]"
        />

        <PageTitle
            title="Оформление заказа"
        />
        
        <div class="checkout__content content-wrapper">
            <template v-if="initLoading">
                <Placeholder type="block" style="--width:100%;--height:80rem"/>
                <Placeholder type="block" style="--width:100%;--height:30rem"/>
            </template>

            <template v-else>
                <CheckoutForm :="{data, errors}"/>
                <div class="desk-visible">
                    <CheckoutProducts 
                        :="{loading, err}"
                        :list="list"
                        @checkout="checkout"
                    />
                </div>
                <div class="mob-visible">
                    <div 
                        class="total-caller text-link--basic"
                        @click="modalRef.modal.call()"
                    >
                        Товары в заказе
                    </div>
                    <CartTotal 
                        :="{loading, err}"
                        :list="list"
                        @checkout="checkout" 
                    />
                </div>
            </template>
        </div>

        <CheckoutProductsModal 
            ref="modalRef"
        />
        
    </div>
</template>

<script setup>
    definePageMeta({
        name: 'Checkout',
        nav: 'Cart'
    })

    //list
        const initLoading = ref(true);
        
        const isCart = !R().query.prods;

        const list = ref([]);

        if(isCart){
            watch(()=>useCart().list, (n)=>{
                if(useCart().initLoading)initLoading.value = true;
                if(n.length){
                    list.value = n;
                    initLoading.value = false;
                }
            }, {immediate: true, deep: true})
        }else{
            list.value = await useCart().parseTmpCart(R().query.prods);
            initLoading.value = false;
        }

    const data = ref({
        "first_name": useUser()?.info ? useUser()?.info?.first_name : '',
        "second_name": useUser()?.info ? useUser()?.info?.second_name : '',
        "last_name": useUser()?.info ? useUser()?.info?.last_name : '',
        "email": useUser()?.info ? useUser()?.info?.email : '',
        "tel": useUser()?.info ? useUser()?.info?.tel : '',
        "delivery_type": 0,
        "payment_type_id": 1,
        "comment": "",
        address: useUser()?.info ? unlink(useUser()?.info.addresses[0]) : {},

        privacy: false,

        //org
        user_type: 0,

        organization: useUser()?.info ? useUser()?.info?.orgs[0].organization : '',
        tax_payer_id: useUser()?.info ? useUser()?.info?.orgs[0].tax_payer_id : '',
        registration_code: useUser()?.info ? useUser()?.info?.orgs[0].registration_code : '',
        manager_name: useUser()?.info ? useUser()?.info?.orgs[0].manager_name : '',
        
        "legal_locality": useUser()?.info ? useUser()?.info?.orgs[0].legal_locality : '',
        "legal_street": useUser()?.info ? useUser()?.info?.orgs[0].legal_street : '',
        "legal_house_number": useUser()?.info ? useUser()?.info?.orgs[0].legal_house_number : '',
        "legal_building": useUser()?.info ? useUser()?.info?.orgs[0].legal_building : '',
        "legal_apartment": useUser()?.info ? useUser()?.info?.orgs[0].legal_apartment : '',

        isUpdateData: false
    })
    
    const modalRef = ref();


    //checkout
        const loading = ref();
        const err = ref();

        const checkout = async ()=>{
            loading.value = true;
            err.value = false;

            try{
                let body = unlink(data.value);
                delete body.address;


                if(
                    !body.first_name || 
                    !body.email ||
                    !body.tel
                )
                    setError(
                        'Заполните контактные данные', 
                        {
                            first_name: !Boolean(body.first_name), 
                            email: !Boolean(body.email), 
                            tel: !Boolean(body.tel)
                        }
                    );

                if(!validateEmail(body.email))
                    setError('Email не верный', {email: true}); 
                
                if(!body.privacy)
                    setError(
                        "Пожалуйста, согласитесь с политикой обработки персональных данных, чтобы продолжить",
                        {privacy: true}
                    );

                if(data.value.delivery_type == 1){
                    body.delivery_city = data.value.address.city;
                    body.delivery_street = data.value.address.street;
                    body.delivery_house = data.value.address.house;
                    body.delivery_housing = data.value.address.housing;
                    body.delivery_entrance = data.value.address.entrance;
                    body.delivery_flat = data.value.address.flat;
                    body.delivery_floor = data.value.address.floor;

                    if(
                        !body.delivery_city ||
                        !body.delivery_street ||
                        !body.delivery_house ||
                        !body.delivery_housing ||
                        !body.delivery_entrance ||
                        !body.delivery_flat ||
                        !body.delivery_floor
                    ){
                        setError(
                            'Полностью заполните адрес доставки',
                            {
                                'delivery_city': !Boolean(body.delivery_city),
                                'delivery_street': !Boolean(body.delivery_street),
                                'delivery_house': !Boolean(body.delivery_house),
                                'delivery_housing': !Boolean(body.delivery_housing),
                                'delivery_entrance': !Boolean(body.delivery_entrance),
                                'delivery_flat': !Boolean(body.delivery_flat),
                                'delivery_floor': !Boolean(body.delivery_floor)
                            }
                        );
                    }
                }else{
                    body.storage_id = 1;
                }

                body.products = list.value.map(e => ({
                    product_id: e.id,
                    count: e.count
                }))

                const fetched = await useAPI(
                    useUser()?.info?
                        `/lk/orders/from_products`:
                        `/lk/order_without_account`,
                    {
                        method: 'POST',
                        body,
                        cache: 'no-cache'
                    },
                );

                if(fetched.error.value){
                    throw new Error(fetched.error?.value?.data?.message);
                }
                
                await new Promise(r => setTimeout(r));

                if(isCart){
                    useCart().clean();
                }

                if(useUser().info && body.isUpdateData){
                    useAPI(
                        '/lk/users/profile',
                        {
                            method: 'POST',
                            body: {
                                first_name: body.first_name,
                                last_name: body.last_name,
                                email: body.email,
                                tel: body.tel,
                                delivery_type: body.delivery_type,
                                payment_type_id: body.payment_type_id,
                                comment: body.comment,
                                addresses: [data.value.address]
                            }
                        }
                    );
                }

                if(window?.ym)
                    ym(57376876,'reachGoal','order');

                if(useUser().info){
                    setTimeout(()=>navigateTo('/user/orders'));
                }else{
                    setTimeout(()=>navigateTo(`/order/${fetched.data.value.code}`));
                }

                // notdone оповещалка, что успешно создан (?)
            } catch(error) {
                err.value = error.message || error;
            } finally {
                loading.value = false;
            }
        }

    //error
        const errors = ref({});

        const setError = (msg, err)=>{
            errors.value = err || {};
            throw new Error(msg);
        }

</script>

<style lang="scss" scoped>
    .checkout{
        &__content{
            display: grid;
            grid-template-columns: 7fr 5fr;
            gap: 3rem;
        }

        .checkout-products{
            position: sticky;
            top: calc(var(--header-height) + 3rem);
        }

        @media (max-width: $navigation-mobile){
            &__content{
                grid-template-columns: 1fr;

                :deep(.cart-total){
                    .cart-total{
                        &__string{
                            display: none;
                        }

                        &__buttons{
                            margin-top: 0;
                        }
                    }
                }

                .total-caller{
                    @include flex-c;
                    height: 4.2rem;
                    margin-bottom: .8rem;
                }
            }
        }
    }

    @include mob-display($mobile);

</style>