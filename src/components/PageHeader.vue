<template>
    <section class="PageHeader">
        <img src="https://raw.githubusercontent.com/rodrigotx21/tecnico-spaces/main/src/assets/IST_Logo.png" class="tecnico" alt="IST Logo">
        <h1><span class="tecnico">Técnico</span> Spaces</h1>
    </section>
</template>

<script>
export default {
    name: 'PageHeader'
};
</script>

<style scoped>
    section.PageHeader {
        width: 100%;
        padding: 1.25rem 0.5rem 0.5rem 0.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1.25rem;
    }

    img.tecnico {
        width: 2.25rem;
        height: auto;
    }

    span.tecnico {
        font-weight: 500;
    }
</style>