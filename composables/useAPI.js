const abortControllers = new Map();

export const useAPI = (
    request, 
    opts={}, 
    customOptions={}
    /*
        abortKey: String // название метода, который при повторном запросе отменит предыдущий свой запрос
        external: String // игнорирует baseURL (Нужно для внешних сервисов)
    */
) => {
    const config = useRuntimeConfig();

    //abort
        if (customOptions.abortKey) {
            opts.signal = createAbortController(customOptions.abortKey);
        }

    //headers
        const headers = {
            Accept: 'application/json',
            Authorization: `Bearer ${useCookie('token').value}`,
            ...(opts.headers || {}),
        }

        delete opts.headers;
        if(!headers.Authorization)delete headers.Authorization;

    //fin
        return useFetch(
            request, 
            { 
                baseURL: customOptions.external?'':config.public.baseURL, 
                headers,
                cache: isCacheAllowed(request, opts)?'force-cache':'no-cache', 
                onRequestError({ request, options, error }){
                    if(error.name == 'AbortError')return;

                    handle500();
                },
                onResponseError({ request, response, options }){
                    if(process.client && response.status == 401){
                        useUser().exit();
                    }

                    if([500,501,502,502].includes(response.status))
                        handle500(response);
                },
                ...opts,
            }
        );
}

const createAbortController = (abortKey) => {
    if (abortControllers.has(abortKey)) {
        abortControllers.get(abortKey).abort();
    }

    const abortController = new AbortController();
    abortControllers.set(abortKey, abortController);

    return abortController.signal;
};


export const useMultipleAPI = (
    fetches // {key: [request, opts, customOptions] ...}
)=> 
    new Promise(
        async (res)=>{
            const fetched = await Promise.all(
                Object.values(fetches).map(e =>useAPI(...e))
            )

            const keys = Object.keys(fetches);

            res(
                Object.fromEntries(
                    keys.map((_, i) => [keys[i], fetched[i]])
                )
            );
        }
    )

//cacheAllowed
    let cacheAllowedArray = []; 

    const isCacheAllowed = (request, opts)=>{
        const key = JSON.stringify([request, opts]);
        if(cacheAllowedArray.includes(key))return true;
        cacheAllowedArray.push(key);
        return false;
    }

const handle500 = (r)=>{
    showError({
        statusCode: 500,
        statusMessage: r?.statusMessage || '',
        fatal: true,
    })
}