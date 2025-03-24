<template>
    <Modal unique-class="registration-success-modal" :ref="r => useUser().registrationSuccessModal = r">
        <h5 class="modal__title">Регистрация прошла успешно!</h5>
        <Button @click="useUser().registrationSuccessModal.close()">Вперед за покупками!</Button>
    </Modal>
</template>

<script setup>

</script>

<style lang="scss">
    .registration-success-modal{
        .modal{
            width: 41.8rem;

            &__title{
                margin-bottom: 2.4rem;
                text-align: center;
            }
        }

        .button{
            width: 100%;
        }
    }
</style>