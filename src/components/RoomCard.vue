<script>
import BreadCrumb from './BreadCrumb.vue';

export default {
    name: 'RoomCard',
    components: {
        BreadCrumb
    },
    props: {
        space: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            space_icon: {
                'campus': new URL('https://raw.githubusercontent.com/rodrigotx21/tecnico-spaces/ef3d5ce4230d6ab54fa5544c3786926c63adb191/src/assets/icons8-big-campus.svg').href,
                'building': new URL('https://raw.githubusercontent.com/rodrigotx21/tecnico-spaces/ef3d5ce4230d6ab54fa5544c3786926c63adb191/src/assets/icons8-big-building.svg').href,
                'floor': new URL('https://raw.githubusercontent.com/rodrigotx21/tecnico-spaces/ef3d5ce4230d6ab54fa5544c3786926c63adb191/src/assets/icons8-big-floor.svg').href,
                'room': new URL('https://raw.githubusercontent.com/rodrigotx21/tecnico-spaces/ef3d5ce4230d6ab54fa5544c3786926c63adb191/src/assets/icons8-big-room.svg').href
            }
        }
    },
    emits: ['openModal'],
    methods: {
        openModal(modal_type) {
            if (modal_type == 'schedule') {
                this.$emit('openModal', modal_type, this.space.id);
            } else {
                this.$emit('openModal', modal_type, this.space.id);
            }
        }
    }
}
</script>
<template>
    <div class="RoomCard" v-motion-slide-right>
        <div class="header">
        <img :src="space_icon[space.type.toLowerCase()]" alt="space-icon-big" class="room_icon">
        <div class="info">
            <h2>{{ space.name }}</h2>
            <h3>{{ space.type.toLowerCase() }}</h3>
        </div>
        <img v-if="space.alwaysOpen == true" src="../assets/icons8-last-24-hours.svg" alt="24-hour-icon" class="clock_icon">
        </div>
        <div class="space_ex">
            <BreadCrumb v-for="(parent, index) in space.location" :space="parent" :last="index === space.location.length - 1" />
        </div>
        <div class="buttons_wrapper">
            <button class="big_button" @click="openModal('blueprint')">
                <img src="../assets/icons8-blueprint.svg" alt="blueprint-icon" class="button_icon">
                <h4 style="white-space: nowrap;">See Blueprint</h4>
            </button>
            <a v-if="space.maps" :href="space.maps" class="small_button">
                <img src="../assets/icons8-google-maps.svg" alt="schedule-icon" class="button_icon">
            </a>
            <button v-if="space.type == 'ROOM'" class="small_button" @click="openModal('schedule')">
                <img src="../assets/icon-schedule.svg" alt="schedule-icon" class="button_icon">
            </button>
        </div>
    </div>
</template>
<style scoped>
    .RoomCard {
        border-radius: 1.25rem;
        padding: 0.625rem;
        margin-bottom: 0.625rem;
        background: var(--card-color);
    }
    .header {
        width: 100%;
        display: flex;
    }
    img.room_icon {
        height: 5rem;
    }
    
    .info {
        width: 100%;
        height: 5rem;
        padding: 0rem 0.625rem;
        display: flex;
        flex-direction: column;
        gap: 0.125rem;
    }

    img.clock_icon {
        height: 2rem;
        width: 2rem;
        color: var(--text-color);
    }

    .space_ex {
        display: flex;
        margin-top: 0.625rem;
        align-items: center;
        gap: 0.125rem;
        flex-wrap: wrap;
    }

    .buttons_wrapper {
        display: flex;
        gap: 0.4375rem;
    }
    

    img.button_icon {
        height: 1.25rem;
    }

    button, a {
        width: 100%;
        margin-top: 0.625rem;
        padding: 0.625rem;
        background: var(--background-color);
        border: none;

        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.625rem;
        border-radius: 0.625rem;
        cursor: pointer;
        color: var(--text-color);
    }
    button:hover, a:hover {
        opacity: 0.9;
    }

    .small_button {
        width: 2.5rem;
    }
</style>