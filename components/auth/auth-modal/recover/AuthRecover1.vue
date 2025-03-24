<template>
    <div class="auth-recover">
        <h5 class="modal__title">Восстановление пароля</h5>
        <p class="auth-recover__subtext">
            Проверьте вашу почту и перейдите по ссылке, которую мы отправили на <br>
            <span class="font-h7">{{data.email}}</span>, <br>
            для сброса и восстановления пароля. 
        </p>
        <p class="auth-recover__subtext">
            Не получили e-mail? <br>
            <a 
                @click="again" 
                class="auth-recover__countdown-wr text-link--basic"
                :disabled="countdown || null"
            >
                Отправить еще раз
                <Countdown
                    v-if="countdown"
                    class="auth-recover__countdown"
                    :time="30 * 1000"
                    :transform="transformSlotProps"
                    v-slot="{ minutes, seconds }"
                    @end="countdown = false"
                >
                    через {{minutes}}:{{ seconds }}
                </Countdown>
            </a>
        </p>
        <div class="auth-modal__btns">
            <Button @click="useUser().authModal.close()">Хорошо</Button>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        data: Object
    })

    const transformSlotProps = (props) => {
        const formattedProps = {};

        Object.entries(props).forEach(([key, value]) => {
            formattedProps[key] = (parseInt(value)) < 10 ? `0${value}` : String(value);
        });

        return formattedProps;
    }

//countdown
    const countdown = ref(true);

    const loading = ref(false);

    const again = async ()=>{
        countdown.value = true;
        loading.value = true;

        const res = await useUser().recover(
            0,
            {
                email: props.data.email,
            }
        );

        loading.value = true;
    }

</script>

<style lang="scss" scoped>
    .auth-recover{
        &__subtext{
            @include font-14;
            text-align: center;
            margin-bottom: 2.4rem;
        }

        &__countdown-wr{
            color: var(--orange-100);
            --hov: var(--black-100);

            &[disabled]{
                pointer-events: none;
                opacity: .6;
            }
        }

        &__countdown{
            display: inline;
        }
    }
</style>