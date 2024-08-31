<template>
    <div ref="modal" >
        <img v-if="type == 'blueprint'" :src="getImageURL()" alt="blueprint" class="blueprint" />
        <div v-if="type == 'schedule'" class="schedule">
            <Qalendar
                :events="events"
                :config="config"
            />
        </div>
    </div>
</template>

<style>
@import "qalendar/dist/style.css";

    img.blueprint {
        border-radius: 0.625rem;
        max-width: 90vw;
        max-height: 90vh; /* Prevents the image's height from exceeding the container's height */
        height: auto; /* Maintains the aspect ratio */
    }

    .schedule {
        width: 90vw;
        height: 90vh;
        color-scheme: dark;
    }
</style>

<script>
import { ref, onMounted } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { Qalendar } from 'qalendar';

export default {
    name: 'Modal',
    components: {
        Qalendar
    },
    props: {
        id: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        //events: {
           // type: Array,
            //required: true
        //}
    },
    setup(props, { emit }) {
        const modal = ref(null);

        onMounted(() => {
            onClickOutside(modal, () => emit('closeModal'));
        });

        const getImageURL = () => {
            console.log("Fetching Image... ");
            return new URL(`https://fenix.tecnico.ulisboa.pt/api/fenix/v1/spaces/${props.id}/blueprint`).href;
        };

        return {
            modal,
            getImageURL
        };
    },
    data() {
        return {
            config: {
                week: {
                    startsOn: 'monday',
                    nDays: 7
                },
                style: {
                    fontFamily: "Inter, sans-serif"
                },
                locale: "en-US",
                defaultMode: 'day',
                disableModes: ['week', 'month'],
                eventDialog: {
                    isDisabled: true
                },
                // The silent flag can be added, to disable the development warnings. This will also bring a slight performance boost
                //isSilent: true,
                showCurrentTime: true, // Display a line indicating the current time 
            },
            events: [
                {
                  title: "Advanced algebra",
                  with: "Chandler Bing",
                  time: { start: "2024-08-31 12:05", end: "2024-08-31 13:35" },
                  isEditable: false,
                  id: "753944708f0f",
                  description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores assumenda corporis doloremque et expedita molestias necessitatibus quam quas temporibus veritatis. Deserunt excepturi illum nobis perferendis praesentium repudiandae saepe sapiente voluptatem!"
                },
                {
                  title: "Advanced algebra",
                  with: "Chandler Bing",
                  time: { start: "2024-08-31 15:05", end: "2024-08-31 16:35" },
                  isEditable: false,
                  color: "red",
                  id: "753944708f0f",
                  description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores assumenda corporis doloremque et expedita molestias necessitatibus quam quas temporibus veritatis. Deserunt excepturi illum nobis perferendis praesentium repudiandae saepe sapiente voluptatem!"
                },
                {
                  title: "Advanced algebra",
                  time: { start: "2024-08-31 15:05", end: "2024-08-31 16:35" },
                  isEditable: false,
                  color: "red",
                  id: "753944708f0f"
                }
            ]
        }
    }
};
</script>