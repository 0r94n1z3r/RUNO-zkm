<template>
    <div class="auth-socials">
        
    </div>
</template>

<script setup>
    
                
</script>

<style lang="scss" scoped>
    .auth-socials{
        display: flex;
        gap: .8rem;

        p{
            padding: 1.1rem 0;
        }

        &__list{
            display: flex;
            flex-wrap: wrap;
            gap: .8rem;
        }
        
        &__item{
            @include flex-c;
            height: 4rem;
            width: 4rem;
            border-radius: 50%;
            transition: .3s;
            cursor: pointer;

            @media (hover: hover){
                &:hover{
                    .auth-socials__icon{
                        transform: scale(.9);
                    }
                }
            }
        }

        &__icon{
            height: 100%;
            width: 50%;
            transition: .3s;
        }
    }
</style>