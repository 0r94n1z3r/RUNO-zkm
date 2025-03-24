<template>
    <Head>
        <Title>{{ R_title }}</Title>
        <Meta name="description" :content="R_description" />

        <Link rel="canonical" :href="'https://' + url.hostname + R().path" />

        <Meta property="og:locale" content="ru_RU" />
        <Meta property="og:type" :content="type" />
        <Meta property="og:title" :content="R_title" />
        <Meta property="og:description" :content="R_description" />
        <Meta property="og:url" :content="url.href" />
        <Meta property="og:site_name" :content="SEO_title()" />
        <!-- <Meta property="og:image" :content="image" /> -->

        <Meta v-for="i in extraMeta" :property="i.property" :content="i.content"/>

    </Head>
</template>

<script setup>
    const props = defineProps({
        title: { type: String },
        description: { type: String },
        // image: { 
        //     type: String, 
        //     default: '' 
        // },
        type: {
            type: String, 
            default: 'website'
        },
        extraMeta: Array
    })

    const url = useRequestURL();

    const R_title = computed(()=>SEO_title(props.title));
    const R_description = computed(()=>SEO_description(props.description));

</script>

<style lang="scss" scoped>

</style>