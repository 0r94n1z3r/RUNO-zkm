export default defineStore("useBrands", ()=>{

    const initLoading = ref(true);
    const {data: fetchedBrands} = useAPI(
        '/brands', 
        {
            server: false,
            onResponse(){
                initLoading.value = false;
            }
        }
    );

    const list = computed(()=>fetchedBrands?.value?.brands || []);

    const brand = (value, key = 'id') => // категория по id
        list.value.find(e => e[key] == value);

    const link = (value, key = 'name') => {
        if(!value)return '';

        if(key != 'name')
            value = brand(value, key)?.name

        return `/brands/${value}`
    }

    

//relevant
    const relevant = computed(()=>{
        const l = list.value.filter(e => e.count);

        //alphabet
            let alphabetList = l.reduce((acc, item) => {
                const firstLetter = item.title[0].toUpperCase();

                if (!acc[firstLetter]) acc[firstLetter] = [];
                
                acc[firstLetter].push(item);

                return acc;
            }, {});

            alphabetList = Object.keys(alphabetList)
                .sort()
                .reduce((acc, key) => {
                    acc.push({key, data: alphabetList[key]});
                    return acc;
                }, []);

            const alphabetCols = alphabetList.reduce(
                (acc, obj) => {
                    for (let step = 2; step <= 6; step++) {

                        let current = acc[step];

                        let minIndex = 0;
                        let minLength = current[0].count;
        
                        for (let i = 1; i < current.length; i++) {
                            if (current[i].count < minLength) {
                                minIndex = i;
                                minLength = current[i].count;
                            }
                        }
        
                        current[minIndex].data.push(obj);
                        current[minIndex].count += obj.data.length + 4;
                    }

                    return acc;
                },
                {
                    2: new Array(2).fill().map(() => ({count: 0, data: []})),
                    3: new Array(3).fill().map(() => ({count: 0, data: []})),
                    4: new Array(4).fill().map(() => ({count: 0, data: []})),
                    5: new Array(5).fill().map(() => ({count: 0, data: []})),
                    6: new Array(6).fill().map(() => ({count: 0, data: []})),
                } 
            )
        
        //popular
            const popular = l.filter(e => e.popular)

        return {
            list: l,
            alphabetList,
            alphabetCols,
            popular
        }
    })

//----------------------------------------------------------------
    return {
        initLoading,
        list,
        brand,
        link,

        relevant
    }
})