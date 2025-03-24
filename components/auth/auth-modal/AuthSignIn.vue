<template>
    <div class="auth-sign-in">
        <h5 class="modal__title">Войти в личный кабинет</h5>
        <form class="auth-modal__form auth-sign-in__form">
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
                @keydown.enter="confirm"
                :ref="e => inpRefs.push(e)"
            />            
        </form>
        <a 
            class="text-link--basic"
            @click="emit('call', 'recovery', 0)"
        >
            Забыли пароль?
        </a>
        <Err :err="useUser().err"/>

        <div class="auth-modal__btns">
            <Button 
                :loading="useUser().loading"
                @click="confirm"
            >
                Войти
            </Button>

            <div class="auth-modal__hr"></div>

            <Button 
                :loading="useUser().loading"
                type="secondary"
                @click="emit('call', 'signup')"
            >
                Зарегистрироваться
            </Button>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        data: Object
    })

    const emit = defineEmits(['success', 'call']);

    const inpRefs = ref([]);

    const confirm = async ()=>{
        const res = await useUser().signIn({
            email: props.data.email,
            password: props.data.password
        });

        if(res)
            emit('success');
    }
</script>

<style lang="scss" scoped>
    .auth-sign-in{
        a{
            display: block;
            margin-top: .4rem;
            color: var(--orange-100);
            --hov: var(--black-100);
            width: fit-content;
        }
    }
</style>