<template>
    <NuxtLayout name="default">

        <Breadcrumbs 
            :list="[{title: 'Ошибка'}]"
        />

        <PageTitle
            :title="`Ошибка ${status}`"
        />

        <Empty
            icon="x"
            icon-size="20"
            :title="`Ошибка ${status}`"
            :text="
                status == 404?
                'К сожалению, запрошенная Вами страница не найдена. Возможно, она была перемещена или удалена.':
                'На сервере что-то сломалось. Мы уже знаем о проблеме, и активно чиним. Пожалуйста, возвращайтесь к нам попозже.'
            "    
        >
            <Button
                v-if="status == 404"
                @click="handleError"
                type="secondary"
            >
                Вернуться на главную
            </Button>
        </Empty>
        <DevOnly>
            <div class="dev-only content-wrapper">
                <h4>{{ error?.message}}</h4>
                <br>
                <pre v-html="error.stack"></pre>
                <br>
                {{ error }}
            </div>
        </DevOnly> 
    </NuxtLayout>
</template>

<script setup>
    const props = defineProps({
        error: Object
    })

    const handleError = () => clearError({ redirect: '/' })

    const status = computed(()=>props.error.statusCode || 404);
</script>

<style lang="scss" scoped>
    .error-page{

    }
</style>