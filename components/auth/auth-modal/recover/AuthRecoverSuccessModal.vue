<template>
    <Modal unique-class="auth-recover-success-modal" :ref="r => useUser().recoverSuccessModal = r">
        <div class="auth-recover-success-modal__container">
            <h5>Новый пароль сохранен</h5>
            <Button @click="useUser().recoverSuccessModal.close()">Отлично!</Button>
        </div>
    </Modal>
</template>

<script setup>
    const emit  = defineEmits(['success']);

</script>

<style lang="scss">
    .auth-recover-success-modal{
        --w: 41.8rem;

        h5{
            margin-bottom: 2.4rem;
            text-align: center;
        }

        .button{
            width: 100%;
        }
    }
</style>