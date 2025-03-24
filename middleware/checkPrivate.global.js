export default defineNuxtRouteMiddleware(async (to, from) => {
    if(useUser().info === null){
        await useUser().getInfo();
    }
    return R().guard(to, from, true)
})