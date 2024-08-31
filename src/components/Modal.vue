<template>
    <img ref="modal" :src="getImageURL(id)" alt="blueprint" />
  </template>
  
  <style scoped>
    img {
        border-radius: 0.625rem;
        max-width: 90%;
        max-height: 90%; /* Prevents the image's height from exceeding the container's height */
        height: auto; /* Maintains the aspect ratio */
    }
  </style>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { onClickOutside } from '@vueuse/core';
  
  export default {
    name: 'Modal',
    props: {
      id: {
        type: String,
        required: true,
      },
    },
    setup(props, { emit }) {
      const modal = ref(null);
  
      onMounted(() => {
        onClickOutside(modal, () => emit('closeModal'));
      });
  
      const getImageURL = (id) => {
        return new URL(`https://fenix.tecnico.ulisboa.pt/api/fenix/v1/spaces/${id}/blueprint`).href;
      };
  
      return {
        modal,
        getImageURL,
      };
    },
  };
  </script>
  