<template>
    <div class="BreadCrumb">
        <img :src="icon[space.type.toLowerCase()]" alt="space-icon" class="crumb_icon">
        <p class="crumb_space">{{ space.name }}</p>
        <img v-if="!last" src="../assets/icons8-right.svg" alt="arrow-right" class="crumb_arrow">
    </div>
</template>

<script>
export default {
    name: 'BreadCrumb',
    data() {
        return {
            icon: {
                'campus': new URL('https://raw.githubusercontent.com/rodrigotx21/tecnico-spaces/ef3d5ce4230d6ab54fa5544c3786926c63adb191/src/assets/icons8-campus.svg').href,
                'building': new URL('https://raw.githubusercontent.com/rodrigotx21/tecnico-spaces/ef3d5ce4230d6ab54fa5544c3786926c63adb191/src/assets/icons8-building.svg').href,
                'floor': new URL('https://raw.githubusercontent.com/rodrigotx21/tecnico-spaces/ef3d5ce4230d6ab54fa5544c3786926c63adb191/src/assets/icons8-floor.svg').href,
                'room': new URL('https://raw.githubusercontent.com/rodrigotx21/tecnico-spaces/ef3d5ce4230d6ab54fa5544c3786926c63adb191/src/assets/icons8-room.svg').href
            }
        }
    },
    props: {
        space: {
            type: Object,
            required: true
        },
        last: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style scoped>
    div.BreadCrumb {
        display: flex;
        padding: 0.125rem 0rem;
        align-items: center;
        gap: 0.125rem;
    }

    p.crumb_space {
        font-size: 0.875rem;
        font-weight: 400;
        color: var(--text-color);
    }
</style>