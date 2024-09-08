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
        width: 90svw;
        height: 70svh;
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
        }
    },
    emits: ['closeModal'],
    setup(props, { emit }) {
        const modal = ref(null);
        const events = ref([]);
        const error = ref(null);

        const getEvents = async () => {
            try {
                const response = await fetch('https://idx-spaces-backend-1874118-eldfff3daa-nw.a.run.app/api/schedule/' + props.id);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                events.value = await response.json();
                console.log('Space events data fetched from API.');

            } catch (err) {
                const errorMsg = 'Error fetching spaces: ' + err.message;
                console.error(errorMsg);
                error.value = errorMsg;
            }
        };

        onMounted(() => {
            onClickOutside(modal, () => emit('closeModal'));

            // Run getEvents on mount if modalType is 'schedule'
            if (props.type === 'schedule') {
                getEvents();
            }
        });

        const getImageURL = () => {
            console.log("Fetching Image... ");
            return new URL(`https://fenix.tecnico.ulisboa.pt/api/fenix/v1/spaces/${props.id}/blueprint`).href;
        };

        return {
            modal,
            events,
            error,
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
            }
        }
    }

};
</script>