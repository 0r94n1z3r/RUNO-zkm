//Стор роутера с полезными методами

export default defineStore("R", ()=>{
    const router = useRouter();
    const route = computed(()=>router.currentRoute.value);

    const push = (r)=>router.push(r);
    const back = (r)=>router.back(r);
    const resolve = (r)=>{
        if(!r)return '';
        return router.resolve(r);
    }

    const name = computed(()=>route.value.name);
    const meta = computed(()=>route.value.meta);
    const query = computed(()=>route.value.query);
    const params = computed(()=>route.value.params);
    const path = computed(()=>route.value.path);
    const fullPath = computed(()=>route.value.fullPath);

    const getHistory = ()=>router.options.history.state;

    const pushQuery = (q)=>{
        let res = Object.assign(
            {},
            query.value,
            q
        )

        res = Object.fromEntries(Object.entries(res).filter(([_, v]) => v != null));

        push({query: res});
    }

    const parseQuery = (key)=>{
        if(!query.value[key])return null;
        return Object.fromEntries(query.value[key].split(';').map(e => e.split('=')))
    }

    //guard
        const guard = (to=route.value, from, isMiddleware)=>{
            if(to.meta.private && !useUser().info){
                const redir = (from && !from?.meta?.private) ? from : '/';

                if(!process.client){
                    return navigateTo(redir);
                }

                if(isMiddleware){
                    useUser().annoy();
                    return abortNavigation();
                }

                push(redir);
            }
        }

        // export default defineNuxtRouteMiddleware((to, from) => {
        //     if(to.meta.private && !useUser().isLogged){
        //         if(!process.client)return navigateTo('/');
        
        //         useUser().annoy()
        //         return abortNavigation()
        //     }
        

//----------------------------------------------------------------
    return {
        router,
        route,

        push,
        back,
        resolve,

        pushQuery,
        parseQuery,

        name,
        meta,
        query,
        params,
        path,
        fullPath,

        getHistory,
        guard,
    }
})