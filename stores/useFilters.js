export default defineStore("useFilters", () => {
//drop
    const called = ref(false);
    // watch(called, n => {
    //     window.scrollTo({ top: 0, behavior: 'instant' });
    // })

//filters
    const keys = ['props', 'filter', 'hasDiscount', 'has_discount', 'sortBy']; //все query или переменные стора, значения которых относятся к фильтрам

    const applyFilter = (key, newFilter) => {
        if (!newFilter || !Object.keys(newFilter).length) {
            R().pushQuery({ [key]: null })
        } else {
            R().pushQuery({ [key]: JSON.stringify(newFilter) })
        }
    }

    //state
        const isFiltersActive = computed(()=>
            keys.some(k => R().query?.[k])
        )

        const resetLoading = ref();
        const reset = ()=>{
            // notdone нужно придумать что-то поумнее
            resetLoading.value = true;
            location = R().route.path;
        };

    // props (props как поле фильтров из api)
        const props = computed(() => JSON.parse(R().query?.props || "null"));

        const isActiveProp = (propId, value) =>
            props.value?.[propId]?.includes(value)


        const switchProp = (propId, value) => {
            let newProps = structuredClone(props.value || {});

            if (!newProps[propId]) { // если prop не существует (добавляем)
                newProps[propId] = [value]
            }
            else if (!isActiveProp(propId, value)) { // если prop существует, но value нет (добавляем)
                newProps[propId].push(value)
            } else { // если prop существует, и value тоже (удаляем)
                newProps[propId] = newProps[propId].filter(e => e != value);
                if (!newProps[propId].length) delete newProps[propId];
            }

            applyFilter('props', newProps);
        }

    //filters (определенные фильтры для поля filter в апи)
        const filter = computed(() => JSON.parse(R().query?.filter || "null"));


        //price
            const dynamicPrice = ref(structuredClone(filter.value?.price) || [null,null]);
            
            const updatePrice = (price) => {
                dynamicPrice.value = price;

                let newFilter = structuredClone(filter.value || {});

                if (price[0] != null || price[1] != null) {
                    newFilter.price = price;
                } else if (newFilter.price) {
                    delete newFilter.price;
                }

                applyFilter('filter', newFilter);
            }

        //filter
            const switchFilter = (key, value)=>{
                let newFilter = structuredClone(filter.value || {});

                if(value == null){
                    delete newFilter[key]
                }else{
                    newFilter[key] = value;
                }

                applyFilter('filter', newFilter);
            }

    //hasDiscount
        const hasDiscount = ref(JSON.parse(R().query?.has_discount || "null"))
        watch(hasDiscount, (n)=>{
            R().pushQuery({ has_discount: n || null })
        });

    //sortBy
        const sortByList = computed(() => [
            { key: "view_counter", order: "desc", title: "Популярные" },
            { key: "price", order: "asc", title: "Дешевле" },
            { key: "price", order: "desc", title: "Дороже" },
        ])

        const sortBy = computed(() => JSON.parse(R().query.sortBy || "null"));

        const sortByDisplay = computed(() =>
            !sortBy.value ?
                sortByList.value[0] :
                sortByList.value.find(e =>
                    e.key == sortBy.value.key &&
                    e.order == sortBy.value.order
                )
        )

        const setSortby = (sort) => {
            if (!sort.key) {
                R().pushQuery({ 'sortBy': null });
                return;
            }

            R().pushQuery({ 'sortBy': JSON.stringify({ key: sort.key, order: sort.order }) })
        }

    

//----------------------------------------------------------------
    return {
        called,

        keys,
        isFiltersActive,
        reset,
        resetLoading,

        props,
        isActiveProp,
        switchProp,
    
        filter,
        dynamicPrice,
        updatePrice,
        switchFilter,

        hasDiscount,
    
        sortBy,
        sortByDisplay,
        sortByList,
        setSortby,
    }
})