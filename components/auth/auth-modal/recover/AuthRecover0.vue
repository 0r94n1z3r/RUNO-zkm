<template>
    <div class="auth-recover">
        <h5 class="modal__title">Восстановление пароля</h5>

        <p class="auth-recover__subtext">Мы отправим ссылку для сброса пароля <nobr>на ваш E-mail</nobr>, указанный при регистрации.</p>

        <form class="auth-recover__form">
            <TextInput
                v-model="data.email"
                tooltip="E-mail в формате: name@instance.ru"
                icon-size="20"
                placeholder="E-mail"
                no-label
                @keydown.enter="confirm"
            />
        </form>
        <Err :err="useUser().err"/>

        <div class="auth-modal__btns">
            <Button 
                :loading="useUser().loading"
                @click="confirm"
                :disabled="!data.email"
            >
                Получить ссылку
            </Button>
            <div class="auth-modal__hr"></div>
            <Button 
                :loading="useUser().loading"
                @click="emit('call', 'signin')"
                type="secondary"
            >
                Войти / Зарегистрироваться
            </Button>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        data: Object
    })

    const emit = defineEmits(['call']);

    const confirm = async ()=>{
        const res = await useUser().recover(
            0,
            {
                email: props.data.email,
            }
        );

        if(res)
            emit('call','recovery', 1);
    }
</script>

<style lang="scss" scoped>
    .auth-recover{
        &__subtext{
            @include font-14;
            text-align: center;
            margin-bottom: 2.4rem;
        }
    }
</style>