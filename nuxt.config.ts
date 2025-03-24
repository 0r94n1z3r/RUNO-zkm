import app from "./nuxt-config/app.js";
import hooks from "./nuxt-config/hooks.js";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app,
    hooks,

    devtools: { enabled: true },
    components: [
        {
            path: '~/components',
            pathPrefix: false,
        },
    ],
    modules: [
        '@pinia/nuxt',
        '@vueuse/nuxt',
        '@nuxtjs/svg-sprite',
        'nuxt-swiper',
        'nuxt3-leaflet',
        'nuxt-countdown',
        [
            'dayjs-nuxt',
            {
                autoImports: ['useDayjs'],
                plugins: ['customParseFormat']
            }
        ],
        [
            'yandex-metrika-module-nuxt3',
            {
                id: 57376876,
                clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true,
                webvisor:true,
                ecommerce:"dataLayer"
            }
        ],
        '@nuxt/eslint',
    ],
    imports: {
        dirs: [
            'helpers'
        ]
    },
    css: [
        '@/assets/scss/main.scss',
    ],
    runtimeConfig: {
        public: {
            baseURL: process.env.BASE_URL
        },
    },
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `
                        @import "@/assets/scss/_mixins.scss";
                        @import "@/assets/scss/_vars.scss";
                        @import "@/assets/scss/_font.scss";
                    `
                }
            },
        },
    },
})