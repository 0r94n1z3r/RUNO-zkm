<template>
    <div class="feedback-form">
        <TextInput 
            placeholder="ФИО"
            v-model="data.person"
        />
        <TextInput 
            placeholder="Телефон"
            v-model="data.tel"
            :mask="GLOBAL_PhoneMask"
        />
        <TextInput 
            placeholder="E-mail"
            v-model="data.email"
        />
        <TextInput 
            placeholder="Наименование организации"
            v-model="data.company_name"
        />
        <TextareaInput
            v-model="data.client_text"
            placeholder="Ваш вопрос"
            :limit="100"
        />
        <Err :={err} />
        <div class="feedback-form__confirm">
            <p class="font-12">Нажимая на кнопку "Отправить", вы соглашаетесь на обработку персональных данных в соответствии с условиями</p>
            <Button 
                type="secondary"
                :="{loading}"
                @click="confirm"
            >
                Отправить
            </Button>
        </div>
        
        <FeedbackSuccessModal ref="modalRef"/>
    </div>
</template>

<script setup>
    import { Mask } from "maska"

    const data = ref({
        person: useUser().info?`${useUser().info?.first_name} ${useUser().info?.last_name}`:"",
        tel: useUser().info?.tel || "",
        email: useUser().info?.email || "",
        company_name: useUser().info?.orgs?.[0]?.organization || "",
        client_text: "",
        type_id: 1,
    });

    const err = ref();
    const loading = ref();

    const confirm = async ()=>{
        err.value = null;
        loading.value = true;

        if(
            !(GLOBAL_PhoneMask.mask.some(m =>
                new Mask({mask: m}).completed(data.value.tel)
            ))
        )err.value = "Заполните телефон";

        if(!data.value.person)err.value = "Заполните Имя";

        if(!validateEmail(data.value.email))err.value = "Неправильный email";
        
        if(err.value){
            loading.value = false;
            return;
        }

        const formData = new FormData();

        Object.entries(data.value).forEach(([key, value]) =>{
            formData.append(key, value)
        })

        try{
            const fetched = await useAPI(
                "/feedbacks/feedback", 
                {
                    method: "POST",
                    body: formData
                }
            )

            if(fetched.error.value){
                throw new Error(fetched.error?.value?.data?.message);
            }

            modalRef.value.modal.call();

        }catch(error) {
            err.value = error.message;
        }finally{
            loading.value = false;
        }
    }

    const modalRef = ref();
</script>

<style lang="scss" scoped>
    .feedback-form{
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 3rem;

        .textarea-input,
        &__confirm
        {
            grid-column: span 2;
        }

        &__confirm{
            @include flex-jtf;
            gap: .8rem 3rem;
            align-items: start;

            p{
                max-width: 29.7rem;
                color: var(--black-40);
            }
        }

        @media (max-width: $mobile) {
            grid-template-columns: 1fr;
            gap: 2.4rem;

            .textarea-input,
            &__confirm
            {
                grid-column: auto;
            }

            &__confirm{
                flex-direction: column;

                p{
                    max-width: unset;
                }

                .button{
                    width: 100%;
                }
            }
        }

    }
</style>