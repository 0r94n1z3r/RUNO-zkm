<template>
    <div class="auth-recover">
        <h5 class="modal__title">Новый пароль</h5>
        <div class="auth-modal__form">
            <p class="font-14">
                Создайте новый пароль для своего аккаунта.<br>
                Пароль должен содержать минимум 8 символов.
            </p>
            <TextInput
                v-model="data.password"
                icon-size="20"
                type="password"
                placeholder="Пароль"
                :ref="e => inpRefs.push(e)"
                @keydown.enter="inpRefs[1].focus()"
            />
            <TextInput
                v-model="data.password2"
                icon-size="20"
                type="password"
                placeholder="Пароль еще раз"
                :ref="e => inpRefs.push(e)"
                @keydown.enter="confirm"
            />
            <Err :err="useUser().err" />
        </div>
        <div class="auth-modal__btns">
            <Button
                :loading="useUser().loading"
                @click="confirm"
            >
                Подтвердить
            </Button>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        data: Object
    })

    const emit = defineEmits(['success']);

    const inpRefs = ref([]);

    const confirm = async ()=>{
        useUser().loading = false;
        useUser().err = false;

        if(!props.data.password || !props.data.password2 || props.data.password != props.data.password2){
            err.value = 'Пароли не совпадают';
            return;
        }

        const res = await useUser().recover(
            1,
            {
                code: R().params.recoveryCode,
                password: props.data.password
            }
        )

        if(res){
            emit('success');
            setTimeout(()=>useUser().recoverSuccessModal.call(), 151);
        }
    }
    
</script>

<style lang="scss" scoped>
    .auth-recover{
        P{
            text-align: center;
        }
    }    

</style>