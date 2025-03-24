<template>
    <div class="loading">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g>
                <circle stroke-dasharray="164.93361431346415 56.97787143782138" r="35" stroke-width="8" stroke="currentColor" fill="none" cy="50" cx="50">
                    <animateTransform keyTimes="0;1" values="0 50 50;360 50 50" dur=".65s" repeatCount="indefinite" type="rotate" attributeName="transform"></animateTransform>
                </circle>
            </g>
        </svg>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
    .loading{
        --color: var(--orange-100);
        --size: 4rem;
        width: var(--size);
        height: var(--size);
        color: var(--color);
        margin: 0 auto;

        svg{
            width: 100%;
            height: 100%;
        }
    }
</style>