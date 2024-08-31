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
            },
            location: this.space.location
        }
    },
    emits: ['openModal'],
    methods: {
        openModal() {
            this.$emit('openModal');
        }
    }
}
</script>
<template>
    <div class="RoomCard">
        <div class="header">
        <img :src="space_icon[space.type.toLowerCase()]" alt="space-icon-big" class="room_icon">
        <div class="info">
            <h2>{{ space.name }}</h2>
            <h3>{{ space.type.toLowerCase() }}</h3>
        </div>
        <!--<input type="checkbox" class="dropdown" :id="space.id">
        <label :for="space.id"></label>-->
        </div>
        <div class="space_ex">
            <BreadCrumb v-for="(parent, index) in location" :space="parent" :last="index === location.length - 1" />
        </div>
        <button class="blueprint_button" @click="openModal">
            <img src="../assets/icons8-blueprint.svg" alt="blueprint-icon" class="blueprint_icon">
            <h5>See Blueprint</h5>
        </button>
    </div>
</template>
<style scoped>
    .RoomCard {
        border-radius: 1.25rem;
        padding: 0.625rem;
        background: var(--card-color);
    }
    /*.RoomCard:has(input[type="checkbox"]:checked) {
        grid-template-rows: 1fr;
        transition: all 300ms;
    }*/
    .header {
        width: 100%;
        display: flex;
        align-items: center;
    }
    img.room_icon {
        height: 5rem;
    }
    
    input[type="checkbox"] {
        display:none;
    }
    input.dropdown + label {
        width: 2rem;
        height: 2rem;
        margin-left: auto;
        margin-right: 0.625rem;
        cursor: pointer;	
        background-image: url(https://raw.githubusercontent.com/rodrigotx21/tecnico-spaces/ef3d5ce4230d6ab54fa5544c3786926c63adb191/src/assets/icon-keyboard-down.svg);
        transition: all 300ms;
    }
    input.dropdown:checked + label {
        transform: rotate(-180deg);
        transition: all 300ms;
    }
    .info {
        width: 50%;
        height: 5rem;
        padding: 0rem 0.625rem;
        display: flex;
        flex-direction: column;
        gap: 0.125rem;
    }

    .space_ex {
        display: flex;
        margin-top: 0.625rem;
        align-items: center;
        gap: 0.125rem;
        flex-wrap: wrap;
    }

    img.blueprint {
        margin-top: 0.625rem;
        width: 100%;
        border-radius: 0.625rem;
    }
    .RoomCard:has(input[type="checkbox"]:not(:checked))
    img.blueprint {
        display: none;
    }

    img.blueprint_icon {
        height: 1.25rem;
    }

    button.blueprint_button {
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
    button.blueprint_button:hover {
        opacity: 0.9;
    }
</style>