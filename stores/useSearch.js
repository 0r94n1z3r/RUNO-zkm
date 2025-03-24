import Fuse from 'fuse.js';
// import { toEngLayout } from 'searchHelpers';

export default defineStore("useSearch", ()=>{
//search
    const searchText = ref(R().query.q || '');

    //stores
        const searchStore = (store)=>{
            if(!searchText.value)return [];

            //layout
                let exactList = [
                    ...store.list.filter(e => {
                        let title = toEngLayout(e.title.toLowerCase());
                        let search = toEngLayout(searchText.value.toLowerCase());
                        return title.includes(search)            
                    })
                ].sort((a, b) => 
                    (a.title.indexOf(searchText.value) - b.title.indexOf(searchText.value))
                );


            //fuse 
                let searched = [];

                if(exactList.length<3){
                    const fuse = new Fuse(
                        store.list, 
                        {
                            keys: ['title'],
                        }
                    );

                    searched = fuse.search(searchText.value).slice(exactList.length,exactList.length+3).map(e => e.item);
                }


            return [...exactList, ...searched].slice(0, 3);
        };

        //category
            const categories = computed(()=>searchStore(useCategories()))

        //category
            const brands = computed(()=>searchStore(useBrands()))

    //products
        const products = ref([]);
        const productsLoading = ref(false);

        const updateProducts = async ()=>{
            productsLoading.value = true;

            try {
                const {
                    data: {value: fetched}
                } = await useAPI(
                    `/search/`,
                    {
                        query: {
                            q: searchText.value,
                            start: 0,
                            end: 9
                        }
                    },
                    {abortKey: 'Search'}
                )
        
                products.value = fetched?.products?.slice(0,10) || [];
                productsLoading.value = false;

            } catch (error) {
                // notdone
                console.error("Ошибка:", error);
                productsLoading.value = false;
            }
        }

        let updateProductsDebounce = null;
        watch(searchText, ()=>{
            if(searchText.value.length < 3) {
                products.value = [];
                return;
            }
            productsLoading.value = true;
            
            if(updateProductsDebounce)clearTimeout(updateProductsDebounce);
            updateProductsDebounce = setTimeout(updateProducts, 300);
        });
//----------------------------------------------------------------
    return {
        searchText,
        
        categories,
        brands,
        
        products,
        productsLoading,
    }
})