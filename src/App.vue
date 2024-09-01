<script setup>
import { ref, onMounted, watch } from 'vue';
import { filterData, SearchType } from 'filter-data';
import { useVirtualList } from '@vueuse/core';
import PageHeader from './components/PageHeader.vue';
import SearchBar from './components/SearchBar.vue';
import RoomCard from './components/RoomCard.vue';
import Modal from './components/Modal.vue';

// Define reactive variables
const spaces = ref({});
const error = ref(null);
const searchQuery = ref('');
const selectedType = ref('');
const filteredSpaces = ref([]);

// Function to fetch data from API
async function fetchDataFromAPI() {
  try {
    const response = await fetch('https://idx-spaces-backend-1874118-eldfff3daa-nw.a.run.app/api/spaces');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    spaces.value = data; 
    filteredSpaces.value = Object.values(spaces.value).flat();
    console.log('Spaces data fetched from API.');

    localStorage.setItem('spaces', JSON.stringify(spaces.value));
    console.log('Spaces data saved to local storage.');

  } catch (err) {
    error.value = 'Error fetching spaces: ' + err.message;
    console.error(error.value);
  }
}

// Fetch data on component mount
onMounted(() => {
  // Retrieve spaces data from local storage
  const savedSpaces = localStorage.getItem('spaces');
  if (savedSpaces) {
    spaces.value = JSON.parse(savedSpaces);
    filteredSpaces.value = Object.values(spaces.value).flat();

    console.log('Spaces data loaded from local storage.');
  } else {
    alert("Bem Vindo ao Técnico Spaces! Aqui podes encontrar todas os espaços do IST. O Técnicos Spaces não está afiliado ao tecnico.ulisboa.pt");
  }

  // Fetch data from API regardless, to ensure freshness
  fetchDataFromAPI();
});


// Watch for changes in searchQuery or selectedType and filter spaces accordingly
watch([searchQuery, selectedType], () => {
    const searchConditions = [
        {
            key: 'name',
            value: searchQuery.value,
            type: SearchType.LK,
        }
    ];

    if (selectedType.value) {
        // Filter spaces of the selected type
        filteredSpaces.value = filterData(spaces.value[selectedType.value] || [], searchConditions);
    } else {
        // Filter through all spaces if no specific type is selected
        filteredSpaces.value = Object.values(spaces.value).flat().filter(space => 
            filterData([space], searchConditions).length > 0
        );

    }
}, { immediate: true });


// Function to handle search and filter
function filterSpaces(query, type) {
  searchQuery.value = query;
  selectedType.value = type;
}

// Use Virtual List
const { list, containerProps, wrapperProps } = useVirtualList(
  filteredSpaces,
  {
    // Keep `itemHeight` in sync with the item's row.
    itemHeight: 188,
  },
)

// Modal
const isModalOpen = ref(false);
const modalType = ref();
const modalId = ref('');

function openModal(type, id) {
  modalId.value = id;
  modalType.value = type;
  isModalOpen.value = true;
}

function closeModal() {
  isModalOpen.value = false;
}
</script>

<template>
    <PageHeader />
    <SearchBar @search="filterSpaces" />
    <div v-bind="containerProps" style="height: calc(100vh - 10rem); overflow-x: hidden;">
      <div v-bind="wrapperProps" class="cards">
        <div v-for="(space, index) in list" :key="index" :id="index">
          <RoomCard :space="space.data" @openModal="openModal"/>
        </div>
      </div>
    </div>
    
    <!-- Blueprint Modal -->
    <div class="modal-bg" v-if="isModalOpen">
        <Modal :type="modalType" :id="modalId" @closeModal="closeModal"/>
    </div>
</template>

<style>
    div.cards {
        display: flex;
        flex-direction: column;
        padding: 0.625rem;
    }

    .modal-bg {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 10;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>