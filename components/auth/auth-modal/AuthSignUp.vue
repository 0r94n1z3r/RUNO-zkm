<template>
    <div class="auth-sign-up">
        <h5 class="modal__title">Регистрация</h5>
        <form class="auth-modal__form auth-sign-up__form">
            <TextInput
                v-model="data.email"
                tooltip="E-mail в формате: name@instance.ru"
                icon-size="20"
                placeholder="E-mail"
                :ref="e => inpRefs.push(e)"
                @keydown.enter="inpRefs[1].focus()"
            />
            <TextInput
                v-model="data.password"
                icon-size="20"
                type="password"
                placeholder="Пароль"
                :ref="e => inpRefs.push(e)"
                @keydown.enter="inpRefs[2].focus()"
            />
            <TextInput
                v-model="data.password2"
                icon-size="20"
                type="password"
                placeholder="Пароль еще раз"
                :ref="e => inpRefs.push(e)"
                @keydown.enter="confirm"
            />
        </form>
        <form class="auth-sign-up__checkboxes font-14">
            <div class="auth-sign-up__checkbox">
                <Checkbox v-model="data.rules"/>
                <p>
                    Соглашаюсь с 
                    <NuxtLink 
                        class="text-link--basic" 
                        to="/pages/politika-obrabotki-personalnyh-dannyh" 
                        target="_blank" 
                    >
                        &nbsp;политикой обработки персональных данных
                    </NuxtLink>
                </p>
            </div>
            <div class="auth-sign-up__checkbox">
                <Checkbox v-model="data.spam"/>
                <p>Соглашаюсь получать новости и специальные предложения</p>
            </div>
            <Err :err="useUser().err"/>
        </form>

        <div class="auth-modal__btns">
            <Button 
                :loading="useUser().loading"
                @click="confirm"
            >
                Зарегистрироваться
            </Button>

            <div class="auth-modal__hr"></div>

            <Button 
                :loading="useUser().loading"
                type="secondary"
                @click="emit('call', 'signin')"
            >
                Войти
            </Button>
        </div>
    </div>
</template>

<script setup>

    const props = defineProps({
        data: Object
    })

    const inpRefs = ref([]);

    const emit = defineEmits(['success', 'call']);

    const confirm = async ()=>{
        
        //errors handler
            useUser().err = null;

            if(!props.data.rules)useUser().err = "Пожалуйста, согласитесь с политикой обработки персональных данных, чтобы продолжить"
            
            if(props.data.password != props.data.password2)useUser().err = "Пароли не совпадают"
            
            if(!props.data.password)useUser().err = "Введите пароль"

            if(useUser().err)return;

        const res = await useUser().signUp({
            email: props.data.email,
            password: props.data.password,
            name: ''
        });

        if(res){
            emit('success');
            setTimeout(()=>useUser().registrationSuccessModal.call(), 151);
        }
    }

</script>

<style lang="scss" scoped>
    .auth-sign-up{
        &__form{
            
            margin-bottom: 2.4rem;
        }

        &__checkboxes{
            @include flex-col;
            gap: .8rem;
            margin-bottom: 2.4rem;
        }

        &__checkbox{
            display: flex;

            .checkbox{
                gap: .8rem;
            }

            a{
                color: var(--orange-100);
                --hov: var(--black);
            }
        }

        .button{
            width: 100%;
        }
    }

    .card{
        @include flex-jtf;
        margin-bottom: 2rem;
        align-items: center;

        p{
            margin-bottom: .8rem;
        }

        :deep(.checkbox__text){
            font-size: inherit;
            color: var(--black-60);
        }

        &__image{
            display: block;
            width: 6.4rem;
            flex-shrink: 0;
        }
    }
</style>