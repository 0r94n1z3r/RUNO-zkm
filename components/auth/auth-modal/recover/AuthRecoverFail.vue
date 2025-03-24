<template>
    <div class="auth-recover">
        <h5 class="modal__title">Восстановление пароля</h5>
        <p>Код восстановления устарел</p>
        <Button
            @click="emit('call', 'recovery', 0)"
        >
            Попробовать заново
        </Button>
    </div>
</template>

<script setup>
    const emit = defineEmits(['call']);
    
</script>

<style lang="scss" scoped>
    .auth-recover{
        text-align: center;
        @include flex-col;
        align-items: center;

        p{
            margin-bottom: 2.4rem;
        }
    }
</style>