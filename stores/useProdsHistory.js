export default defineStore("useProdsHistory", ()=>{
    const getIds = ()=>JSON.parse(localStorage.ZKM_prodsHistory || '[]').filter(id => id).slice(0,20);
    const setIds = (ids)=> localStorage.ZKM_prodsHistory = JSON.stringify(ids.filter(id => id));

//init
    const loading = ref(true);
    const list = ref([]);

    const init = async ()=>{
        if(!localStorage)return;

        if( !getIds().length || list.length){
            loading.value = false;
            return;
        }

        loading.value = true;
        
        const fetched = await useAPI(
            `/products/by_ids`, 
            {
                method: 'POST',
                body: {
                    ids: getIds(),//ids.value
                }
            }
        )
        
        list.value = fetched.data.value.filter(e => e.id) || [];

        loading.value = false;
    }

    if(process.client){
        setTimeout(init, 1)
    }

//actions
    const push = (product) => {
        if(!process.client || !product?.id) return;

        const ids = getIds();
        const index = ids.indexOf(product.id);

        if(index !== -1) {
            ids.splice(index, 1);
            list.value.splice(index, 1);
        }
        
        ids.unshift(product.id);
        list.value.unshift(product);

        setIds(ids);
    }

    const clear = () => {
        list.value = [];
        setIds([]);
    } 


    
//----------------------------------------------------------------
    return {
        init,
        loading,
        list,
        push,
        clear,
    }
})