export default defineStore("useFavorites", ()=>{
    
    const list = ref([]);
    const loading = ref(true);

    //upd
        const update = async ()=>{
            loading.value = true;

            if(!useUser().info?.id){
                list.value = [];
            }else{
                await new Promise(r => setTimeout(r));
                ({data: {value: list.value}} = await useAPI(
                    `/lk/favorites`,
                    {
                        server: false,   
                        cache: 'no-cache'
                    }
                ));
            }

            loading.value = false;
        }

        watch(()=>useUser().info?.id, update); 
        onMounted(update);

    // methods
        const isFav = (value, key="id")=>{
            if(!value || !useUser().info)return false;
            return list.value?.some(e => e?.[key] == value);
        }

        const switchFav = (product)=>{
            let method;

            if(isFav(product.id)){
                list.value = list.value.filter(e => e.id != product.id);
                method = 'DELETE';
            }else{
                list.value.push(product);
                method = 'POST';
                
                if(window?.ym)
                    ym(57376876,'reachGoal','vizbrannoe');
            }


            useAPI(
                `/lk/favorites`,
                {
                    method,
                    body: {
                        product_ids: [product.id]
                    }
                }
            )
        }

    
    
//----------------------------------------------------------------
    return {
        list,
        loading,

        switchFav,
        isFav,
    }
})