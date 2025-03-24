export default defineStore("useLayout", ()=>{

// header drop
    const headerDropCalled = ref(false);

    watch(()=>R().fullPath, ()=>headerDropCalled.value = false);

//size
    onMounted(() => {
        if(process.client){
            initElement('headerHeight', 'header', 'header-height');
            initElement('footerHeight', 'footer', 'footer-height');
            initElement('mobileNavigation', 'mobile-navigation', 'mobile-navigation-height');
        }
    })

    const elements = ref({});
    const {width: wWidth} = useWindowSize(); 

    const initElement = (key, id, cssVar)=>{
        const scale = useElementSize(document.getElementById(id));

        watch(
            ()=>scale.height.value, 
            (n)=>{
                if(!n)return;
                
                document.documentElement.style.setProperty(`--${cssVar}`, n + 'px');

                if(n > elements.value[key+'--og'])setOG();
            }, 
            {immediate: true}
        );

        const setOG = ()=>{
            if(!scale.height.value)return;

            const og = scale.height.value;

            setTimeout(()=>document.documentElement.style.setProperty(`--${cssVar}--og`, og + 'px'));
            elements.value[key+'--og'] = og;
        }

        setTimeout(()=>{
            watch(
                ()=>wWidth.value, 
                setOG, 
                {immediate: true}
            );
        })

        elements.value[key] = scale.height;
    }

//----------------------------------------------------------------
    return {
        headerDropCalled,
        elements
    }
})