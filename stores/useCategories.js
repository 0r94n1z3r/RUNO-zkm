export default defineStore("useCategories", ()=>{
//drop
    const called = ref(false);
    const navIds = ref([]);
    const navigationBackHandler = ()=>{
        if(!navIds.value.length){
            called.value = false;
            return;
        }
        navIds.value.pop();
    }
    watch(called, n => { //сброс после закрытия
        if(!n){
            setTimeout(
                () => navIds.value = [], 
                301 //окончание анимации
            );
        }
    })
    watch(()=>R().fullPath, ()=>called.value = false);
    
//categories
    const initLoading = ref(true);
    const {data: fetchedCategories} = useAPI(
        '/categories', 
        {
            // query: {mini: true}, 
            server: false,
            onResponse(){initLoading.value = false}
        }
    );
    const list = computed(()=>fetchedCategories?.value?.categories || []);

    const getCategoryId = (value, key) => 
        key == 'id'?
            value:
            (category(value, key)?.id || 0);

    const category = (value, key = 'id')=> // категория по id
        list.value.find(e => e[key] == value);

    const mainCategories = computed(()=> // список основных категорий
        list.value.filter(e => e?.parent_id == null)
    )

    const hasSubCategories = (value, key = 'id') => {// есть ли подкатегории
        let id = getCategoryId(value, key);
        return list.value.some(e => e?.parent_id == id);
    }

    const subCategories = (value, key = 'id') => { // список подкатегорий
        let id = getCategoryId(value, key);
        return list.value.filter(e => e?.parent_id == id);
    }

    //parents
        const isParent = (childCategory, potentialParentId) => { // является ли категория potentialParentId родителем для childCategory
            if(!childCategory)return false;

            if (childCategory.parent_id === potentialParentId) {
                return true;
            } else if (childCategory.parent_id !== null) {
                const parentCategory = category(childCategory.parent_id, 'id');
                return isParent(parentCategory, potentialParentId);
            }

            return false;
        };

//tree
    const getFilteredTree = (func)=>{ // отфильтрованное дерево по условию func(категория) 
        const map = new Map();
        list.value.forEach(obj => map.set(obj.id, {...obj, children: []}));

        const root = [];

        list.value.forEach(obj => {
            if (obj.parent_id !== null && map.has(obj.parent_id)) {
                map.get(obj.parent_id).children.push(map.get(obj.id));
            } else {
                root.push(map.get(obj.id));
            }
        });

        const filterTree = (node) => {
            if (func(node)) {
                return node;
            }

            const filteredChildren = node.children
                .map(child => filterTree(child))
                .filter(child => child !== null);

            if (filteredChildren.length > 0) {
                return {...node, children: filteredChildren};
            }

            return null;
        }

        return root
            .map(node => filterTree(node))
            .filter(node => node !== null);
    }

    const getTreeIds = (category) =>{
            let ids = [];

            const recurse = (currentNode) => {
                ids.push(currentNode.id);

                if (currentNode.children && currentNode.children.length > 0) {
                    for (let child of currentNode.children) {
                        recurse(child);
                    }
                }
            }

            recurse(category);

            return ids;
    }

    //stickers
        const stickerTree = (sticker) => { // рекурсивное дерево категорий по стикер
            if(!sticker)return [];
            return getFilteredTree(e => e[sticker])
        }
        
    //brand
        const getBrandTree = async (value, key = 'id')=>{

            if(key != 'id'){
                value = useBrands().brand(value, key)?.id;
            }

            if(!value)return;

            value = Number(value);

            try {
                const {data: {value: fetched}} = await useAPI(`/brands/categories/${value}`);

                const ids = fetched.map(e => e.id);

                return getFilteredTree(e => ids.includes(e.id));
            }catch(error) {
                // notdone
                console.error("Ошибка при получении информации:", error);
            }
        }

//breadcrumbs
    const prevCrumbsId = ref();
    const breadcrumbs = (value, key = 'id') => { // Возвращает, в виде массива рекурсивно родителей категории с id (и саму категорию в качестве последнего элемента)                
        if(!value){
            if(prevCrumbsId.value)return breadcrumbs(prevCrumbsId.value);
            return [];
        }

        let id = getCategoryId(value, key);

        prevCrumbsId.value = id;
        let res = [];
        let currentId = id;

        do {
            res.unshift(category(currentId));
            currentId = res?.[0]?.parent_id;
        } while(currentId != null)

        return res;
    }    

//----------------------------------------------------------------
    return {
        called,
        navigationBackHandler,
        navIds,

        initLoading,
        list,
        category,
        mainCategories,
        hasSubCategories,
        subCategories,
        isParent,

        getFilteredTree,
        getTreeIds,
        stickerTree,
        getBrandTree,

        breadcrumbs,
    }
})