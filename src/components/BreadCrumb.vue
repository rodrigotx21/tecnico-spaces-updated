<template>
    <div class="BreadCrumb">
        <img src="" alt="">
    </div>
</template>

<script>
export default {
    name: 'BreadCrumb',
    data() {
        return {
            icon: {
                'campus': new URL('https://raw.githubusercontent.com/rodrigotx21/tecnico-spaces/ec976ffc249d4ecfedf2cbf29d69b2c4aad258dd/src/assets/icons/icons8-campus.svg').href,
                'building': new URL('https://raw.githubusercontent.com/rodrigotx21/tecnico-spaces/ec976ffc249d4ecfedf2cbf29d69b2c4aad258dd/src/assets/icons/icons8-building.svg').href,
                'floor': new URL('https://raw.githubusercontent.com/rodrigotx21/tecnico-spaces/ec976ffc249d4ecfedf2cbf29d69b2c4aad258dd/src/assets/icons/icons8-floor.svg').href,
                'room': new URL('https://raw.githubusercontent.com/rodrigotx21/tecnico-spaces/ec976ffc249d4ecfedf2cbf29d69b2c4aad258dd/src/assets/icons/icons8-room.svg').href
            }
        }
    }
}
</script>