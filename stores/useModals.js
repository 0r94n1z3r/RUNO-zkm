export default defineStore("useModals", ()=>{
    const activeModalsCount = ref(0); // каунтер открытых модалок (всех) он нужен для стабильной работы скрола
    watch(activeModalsCount, (n)=>{if(n<0)activeModalsCount.value = 0})

    class Modal{
        constructor(){
            this.modal;
        }

        init(modalRef){
            this.modal = modalRef
        }
    }

//feedback
    const comparisonSnack = new Modal;
    
//----------------------------------------------------------------
    return {
        activeModalsCount,
        comparisonSnack
    }
})