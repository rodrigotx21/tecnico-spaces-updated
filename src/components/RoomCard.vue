<script>
export default {
    name: 'RoomCard',
    props: {
        space: {
            type: Object,
            required: true
        }

    },
    data() {
        return {
            space_icon: {
                'campus': new URL('https://raw.githubusercontent.com/rodrigotx21/tecnico-spaces/ec976ffc249d4ecfedf2cbf29d69b2c4aad258dd/src/assets/icons/icons8-campus.svg').href,
                'building': new URL('https://raw.githubusercontent.com/rodrigotx21/tecnico-spaces/ec976ffc249d4ecfedf2cbf29d69b2c4aad258dd/src/assets/icons/icons8-building.svg').href,
                'floor': new URL('https://raw.githubusercontent.com/rodrigotx21/tecnico-spaces/ec976ffc249d4ecfedf2cbf29d69b2c4aad258dd/src/assets/icons/icons8-floor.svg').href,
                'room': new URL('https://raw.githubusercontent.com/rodrigotx21/tecnico-spaces/ec976ffc249d4ecfedf2cbf29d69b2c4aad258dd/src/assets/icons/icons8-room.svg').href
            }
        }
    }
}
</script>
<template>
    <li class="RoomCard">
        <div class="header">
            <img :src="space_icon[space.type.toLowerCase()]" alt="room-icon" class="room_icon">
            <div class="info">
                <h2>{{ space.name }}</h2>
                <h3>{{ space.type.toLowerCase() }}</h3>
            </div>
            <input type="checkbox" class="dropdown" :id="space.id">
            <label :for="space.id"></label>
        </div>
    </li>
</template>
<style scoped>
    .RoomCard {
        padding: 0.625rem;
        border-radius: 1.25rem;
        background: var(--card-color);
        transition: all 300ms;
    }
    .RoomCard:has(input[type="checkbox"]:checked) {
        height: 200px;
        transition: all 300ms;
    }
    .header {
        width: 100%;
        display: flex;
        align-items: center;
    }
    img.room_icon {
        width: 5rem;
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
        background-image: url(https://raw.githubusercontent.com/rodrigotx21/tecnico-spaces/ec976ffc249d4ecfedf2cbf29d69b2c4aad258dd/src/assets/icons/icon-keyboard-down.svg);
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
</style>