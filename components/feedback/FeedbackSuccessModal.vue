<template>
    <Modal ref="modalRef" unique-class="feedback-success-modal">
        <h4>Спасибо! Ваша заявка принята, ожидайте звонка нашего специалиста. </h4>
        <div class="feedback-success-modal__btn-wr">
            <Button @click="modalRef.close()">Отлично!</Button>
        </div>
    </Modal>
</template>

<script setup>
    const modalRef = ref();
    defineExpose({modal: modalRef});
</script>

<style lang="scss">
    .feedback-success-modal{
        --mx-w: 50rem;

        &__btn-wr{
            @include flex-col;
            align-items: center;
            width: 100%;
        }

        h4{
            margin-bottom: 2rem;
            text-align: center;
            max-width: 52rem;
        }
    }
</style>