<template>
    <Modal unique-class="annoying-modal" :ref="r => useUser().annoyingModal = r" close-outside>
        <h4>Давайте дружить!</h4>
        <!-- notdone design -->
        <Button @click="callAuth">Войти или зарегистрироваться</Button>
    </Modal>
</template>

<script setup>
    import { useStorage } from '@vueuse/core'

//auth
    const annoyed = useStorage('ZKM_annoyed', false);
    const callAuth = ()=>{
        annoyed.value = true;
        useUser().annoyingModal.close();
        setTimeout(()=>{
            useUser().authModal.call();
        }, 152);
    }
</script>

<style lang="scss">
    .annoying-modal{
        h4{
            margin-bottom: 1.6rem;
        }
    }
</style>