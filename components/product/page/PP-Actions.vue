<template>
    <div class="pp-actions">
        <div 
            class="pp-action pp-action--copy"
            @click="copyCode"
        >
            {{ codeText }}
        </div>

        <div 
            class="pp-action pp-action--like"
            @click="likeHandler"
        >
            <Icon :name="isFav?'heart-filled':'heart'" size="16"/>
            <p class="text-link">{{isFav?'В избранном':'Добавить в избранное'}}</p>
        </div>

        <div 
            class="pp-action pp-action--share"
            @click="share"
        >
            <Icon name="share-2" size="16"/>
            <p class="text-link">{{legacyShare?'Скопировано':'Поделиться'}}</p>
        </div>

        
    </div>
</template>

<script setup>
    const props = defineProps({
        info: Object
    })

    //code
        const codeText = ref(`Код товара: ${props.info?.code}`);

        const copyCode = async ()=>{
            try{
                await copyToClipboard(props.info?.code)
                    .finally(()=>{
                        setTimeout(() => 
                            codeText.value = `Код товара: ${props.info?.code}`,
                            1500
                        );
                    });
                codeText.value = 'Скопировано!';
            }catch{
                codeText.value = 'Ошибка';
            }
        }

    //like
        const isFav = computed(()=>useFavorites().isFav(props.info?.id));

        const likeHandler = ()=>{
            if(!useUser().info){
                useUser().annoy();
                return;
            }

            useFavorites().switchFav(props.info)
        }

    //share
        const legacyShare = ref(false);

        const share = async ()=>{
            const url = location.href;

            const shareData = {
                title: document.title,
                text: document.description,
                url
            }

            if(navigator.canShare(shareData)){
                navigator.share(shareData);
            }else{
                try{
                    await copyToClipboard(url)
                        .finally(()=>{
                            setTimeout(() => 
                                legacyShare.value = false,
                                1500
                            );
                        });

                    legacyShare.value = true;
                }catch{}
            }
        }

</script>

<style lang="scss" scoped>
    .pp-actions{
        @include flex-col;
        gap: .8rem;
    }

    .pp-action{
        display: flex;
        align-items: center;
        gap: .8rem;
        @include font-14;
        cursor: pointer;

        color: var(--orange-100);

        .icon{
            transition: .3s;
        }

        @media (hover: hover) {
            &:hover{
                color: var(--black-100)
            }
        }

        p{
            --hov: inherit;
            --underline: var(--orange-30);
        }

        &--copy{
            transition: .3s;
            color: var(--gray-100);
            margin-bottom: .8rem;
        }

    }
</style>