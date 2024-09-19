<script setup>
import { ref, onMounted, watch, nextTick } from 'vue';
import Fuse from 'fuse.js'
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
    console.log('Spaces data fetched from API.');

    // Apply bookmarks from localStorage
    const bookmarkedIds = JSON.parse(localStorage.getItem('bookmarkedSpaces') || '[]');
    for (let type in spaces.value) {
      data[type] = data[type].map(space => ({
        ...space,
        bookmarked: bookmarkedIds.includes(space.id)
      }));
    }
    filteredSpaces.value = Object.values(spaces.value).flat();
    console.log('Bookmarks applied!')

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
    alert("Bem Vindo ao Técnico Spaces! Aqui podes encontrar todos os espaços do IST. O Técnico Spaces não está afiliado ao tecnico.ulisboa.pt");
  }

  // Fetch data from API regardless, to ensure freshness
  fetchDataFromAPI();
});


// Watch for changes in searchQuery or selectedType and filter spaces accordingly
watch([searchQuery, selectedType, spaces], () => {
    // Check if searchQuery.value is a string
    if (typeof searchQuery.value !== 'string') {
        console.error('searchQuery must be a string')
        return
    }

    // Determine the dataset to search
    let dataset;
    if (selectedType.value) {
        dataset = spaces.value[selectedType.value] || [];
    } else {
        dataset = Object.values(spaces.value).flat();
    }

    // Initialize Fuse with the appropriate dataset and options
    const fuse = new Fuse(dataset, { keys: ['name'] });

    // Perform the search or return the full list if searchQuery is empty
    if (searchQuery.value.trim() === '') {
        filteredSpaces.value = dataset;
    } else {
        filteredSpaces.value = fuse.search(searchQuery.value).map(result => result.item);
    }

    // Sort the filtered spaces to show bookmarked spaces first
    filteredSpaces.value.sort((a, b) => {
        if (a.bookmarked === b.bookmarked) return 0;
        if (a.bookmarked) return -1;
        return 1;
    });

    nextTick(() => {
        scrollTo(0);
    });
}, { immediate: true });


// Bookmark spaces
function toggleBookmarked(id) {
  // Iterate over each type of space
  for (let type in spaces.value) {
    let spaceList = spaces.value[type];
    let space = spaceList.find(space => space.id === id);
    // If the space is found, toggle the bookmarked property
    if (space) {
      space.bookmarked = !space.bookmarked;

      // Update the local storage for bookmarked spaces
      const bookmarkedIds = JSON.parse(localStorage.getItem('bookmarkedSpaces') || '[]');
      if (space.bookmarked) {
        bookmarkedIds.push(space.id);
      } else {
        const index = bookmarkedIds.indexOf(space.id);
        if (index > -1) {
          bookmarkedIds.splice(index, 1);
        }
      }
      localStorage.setItem('bookmarkedSpaces', JSON.stringify(bookmarkedIds));
      console.log(`Space with id ${id} bookmarked status toggled and updated in local storage.`);

      return; // Exit the function once the space is found and toggled
    }
  }
}

// Function to handle search and filter
function filterSpaces(query, type) {
  searchQuery.value = query;
  selectedType.value = type;
}

// Use Virtual List
const { list, containerProps, wrapperProps, scrollTo } = useVirtualList(
  filteredSpaces,
  {
    // Keep `itemHeight` in sync with the item's row.
    itemHeight: 188,
  }
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
    <div ref="container" v-bind="containerProps" style="height: calc(100% - 9.85rem); overflow-x: hidden;">
      <div v-bind="wrapperProps" class="cards">
        <div v-for="(space, index) in list" :key="index" :id="index">
          <RoomCard :space="space.data" @openModal="openModal" @toggleBookmarked="toggleBookmarked"/>
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