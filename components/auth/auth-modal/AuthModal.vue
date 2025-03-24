<template>
    <Modal unique-class="auth-modal" :ref="r => useUser().authModal = r" @close="closeHandler" @call="callHandler">
        <component 
            :is="component" 
            :="{data}" 
            @success="successHandler"
            @call="callHandler"
        />
    </Modal>
</template>

<script setup>
    import { 
        AuthSignIn, 
        AuthSignUp,
        AuthRecover0,
        AuthRecover1,
        AuthRecoverFin,
        AuthRecoverFail,
    } from "#components";

//component
    const component = ref(AuthSignIn);

//data
    const data = ref({
        email: '',
        password: '',
        password2: '',
        code: '',
        rules: false,
        spam: true
    })

    const closeHandler = ()=>{
        setTimeout(()=>{
            useUser().err = '';
            component.value = AuthSignIn;
        }, 151)
    }

    const successHandler = ()=>{
        data.value.email = '';
        data.value.password = '';
        data.value.password2 = '';
        data.value.name = '';
        data.code = '',
        data.value.rules = false;
        data.value.spam = true;
        useUser().authModal.close();
    }

//recovery
    const recovery = (id)=>{
        useUser().err = '';
        const arr = [AuthRecover0, AuthRecover1, AuthRecoverFin, AuthRecoverFail]
        component.value = arr[id];
    }

//callHandler
    const callHandler = (type, id)=>{
        switch(type){
            case 'signup':
                component.value = AuthSignUp;
                break;
            case 'recovery':
                recovery(id);
                break;
            default:
                component.value = AuthSignIn;
        }
    }


</script>

<style lang="scss">
    .auth-modal{
        .modal{
            width: 41.8rem;

            &__title{
                margin-bottom: 2.4rem;
                text-align: center;
            }

            .err{
                margin-top: 2.4rem;
            }
        }

        &__form{
            @include flex-col;
            gap: 2.4rem;

            .text-input{
                &__input{
                    @include padding-y(1.1rem);
                }
            }
        } 

        &__btns{
            margin-top: 2.4rem;
            @include flex-col;
            gap: 2.4rem;

            .button{
                width: 100%;
            }
        }

        &__hr{
            width: 100%;
            position: relative;
            height: 1.8rem;

            &::before,
            &::after{
                @include pseudo-absolute;
                @include all-directions(0);
                margin: auto;
            }

            
            &::before{
                width: 100%;
                height: 1px;
                background: var(--black-10);
            }

            &::after{
                content: 'или';
                @include font-14;
                color: var(--black-40);
                background: var(--white);
                width: max-content;
                height: max-content;
                padding: 0 .8rem;
            }
        }
    }
</style>