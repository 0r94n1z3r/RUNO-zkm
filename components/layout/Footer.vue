<template>
    <div class="footer" id="footer">
        <div class="footer__wr content-wrapper">
            <div class="footer__col" :dropped="cols[0] || null">
                <Logo to="/"/>
                <div class="footer-caller mob-visible" @click="cols[0] = !cols[0]">
                    <h6>Адрес и контакты</h6>
                    <Icon name="chevron-down" size="24"/>
                </div>
                <div class="footer__col-container font-14">
                    <a  
                        class="text-link font-h5"
                        :href="`tel:${useStatic().contacts.tel}`"
                    >
                        {{ useStatic().contacts.tel }}
                    </a>

                    <div class="footer__address">
                        <a 
                            class="text-link--basic" 
                            href="https://yandex.eu/maps/-/CDhIrB16" 
                            target="_blank"
                        >
                            {{ useStatic().contacts.address }}
                        </a>
                        <p>{{ useStatic().contacts.time }}</p>
                    </div>

                    <a 
                        class="text-link" 
                        :href="`mailto:${useStatic().contacts.email}`"
                    >
                        {{ useStatic().contacts.email }}
                    </a>
                </div>
            </div>

            <div class="footer__col" :dropped="cols[2] || null">
                <div class="footer-caller" @click="cols[2] = !cols[2]">
                    <h6>Покупателям</h6>
                    <Icon class="mob-visible" name="chevron-down" size="24"/>
                </div>
                <div class="footer__col-container font-14">
                    <div class="footer__col-links">
                        <div 
                            class="footer__col-link"
                            v-for="i in useContentPages().list"
                        >
                            <NuxtLink  
                                class="text-link text-link--inline" 
                                :href="`/pages/${i.name}`"
                            >
                                {{ i.title }}
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </div>

            <div class="footer__col" :dropped="cols[1] || null">
                <div class="footer-caller" @click="cols[1] = !cols[1]">
                    <h6>О компании</h6>
                    <Icon class="mob-visible" name="chevron-down" size="24"/>
                </div>
                <div class="footer__col-container font-14">
                    <div class="footer__col-links">
                        <div 
                            class="footer__col-link"
                            v-for="i in [
                                {title: 'Контакты', to: '/pages/contacts'},
                                // {title: 'Адреса магазинов', to: '#'},
                                // {title: 'Новости', to: '#'},
                                // {title: 'Услуги', to: '#'},
                            ]"
                        >
                            <NuxtLink  
                                class="text-link text-link--inline" 
                                :to="i.to"
                            >
                                {{ i.title }}
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </div>

            <div class="footer__col">
                <div class="footer-caller">
                    <h6>Будем на связи</h6>
                </div>
                <div class="footer__socials" dropped>
                    <a 
                        v-for="i in [
                            {icon: 'vk'},
                            {icon: 'tw'},
                            {icon: 'fb'},
                            {icon: 'ok'},
                            {icon: 'yt'},
                        ]"
                        class="text-link--basic" 
                        href="#" 
                        target="_blank"
                    >
                        <SvgIcon
                            :name="`socials/${i.icon}`"
                        />
                    </a>
                </div>
                <div class="footer__divider mob-visible"></div>
                <p class="footer__legal-text">
                    Copyright © 2013–2019 ООО “ЗКМ”. Все права защищены.
                </p>
                <p class="footer__legal-text">
                    <a href="https://runova.tech/" class="runova text-link--basic" target="_blank">
                        <SvgIcon name="runova"/> 
                    </a>
                    — разработка и поддержка сайтов
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
    const cols = ref([false, false, false])
</script>

<style lang="scss" scoped>
    .footer{
        margin-top: 8rem;

        @include padding-y(6rem);
        background: white;
        border-top: .1rem solid var(--black-10);

        &__wr{
            @include flex-jtf;
            gap: 5.2rem;
        }

        .footer-caller{
            @include flex-jtf;
        }

        .logo{
            width: 6.9rem;
            height: 2.4rem;
        }

        &__col{
            @include flex-col;
            gap: 2.6rem;

            h6{
                white-space: nowrap;
            }
        }

        &__col-container{
            @include flex-col;
            gap: 2.6rem;
        }

        &__address{
            @include flex-col;
            gap: .4rem;
        }

        &__col-links{
            display: flex;
            flex-wrap: wrap;
            gap: 1.8rem 1.1rem;
            max-width: 24.8rem;
        }

        &__socials{
            display: flex;
            gap: 2.8rem;

            a{
                @include virtual-area(.6rem);
            }

            svg{
                display: block;
                height: 1.6rem;
                width: 1.6rem;
            }
        }

        &__legal-text{
            @include font-12;
            color: var(--black-60);
        }
        
        .runova{
            svg{
                width: 5.4rem;
                height: 1.3rem;
                display: inline-block;
            }
        }

        &__divider{
            height: .1rem;
            width: 100%;
            background: var(--black-10);
        }

        @media (max-width: $navigation-mobile){
            &__wr{
                flex-direction: column;
                gap: 0rem;
            }

            .footer-caller{
                padding: 1.2rem 0;
                cursor: pointer;

                .icon{
                    transition: .3s;
                }
            }

            &__col{
                gap: 1.2rem;
                border-bottom: .1rem solid var(--black-10);
                
            
                &:last-child{
                    border-bottom: 0;
                }

                &:not(:last-child){
                    .footer-caller{
                        margin-bottom: -1.2rem;   
                    }
                }

                &:not([dropped]){
                    .footer-caller{
                        margin-bottom: 0;
                    }

                    .footer{
                        &__col-container{
                            display: none;
                        }
                    }
                }

                &[dropped]{
                    .footer-caller{
                        .icon{
                            transform: rotate(.5turn);
                        }
                    }
                }
            }

            &__col-container{
                gap: 1.2rem;
                padding-bottom: 2.4rem;
            }

            &__legal-text{
                @include font-14;
            }
        }   
    }

    @include mob-display($navigation-mobile);
</style>