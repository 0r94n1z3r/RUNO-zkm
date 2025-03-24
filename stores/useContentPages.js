export default defineStore("useContentPages", ()=>{

    const {data: fetchedTypes} = useAPI('content_page_types', {default: ()=>({contentPageTypes: []})});
    const types = computed(()=>fetchedTypes.value?.contentPageTypes);

    const {data: fetchedPages} = useAPI('contentpages', {default: ()=>({contentPages: []})});
    const list = computed(()=>fetchedPages.value?.contentPages);

    const page = (key, keyName='id')=>
        list.value?.find(e => e[keyName] == key);

    const tree = computed(() => 
        types.value.map(e => ({
            ...e,
            list: list.value.filter(p => p.content_page_type_id == e.id)
        })
    ));

//----------------------------------------------------------------
    return {
        list,
        types,
        page,
        tree
    }
})