<template>
    <header class="flex items-center justify-between p-4 mx-20 text-white">
      <!-- Logo Component -->
      <Logo />
  
      <!-- Navigation Bar -->
      <NavBar />
  
      <!-- Action Buttons -->
      <div class="flex items-center space-x-4">
        <!-- Color Palette Dropdown -->
        <div class="relative">
          <button
            class="p-2 rounded-full border border-gray-700 text-white hover:bg-gray-700"
            @click="toggleDropdown"
            aria-label="Change Color Palette"
          >
            🎨
          </button>
          <div
            v-if="dropdownOpen"
            class="absolute mt-2 p-2 bg-gray-800 rounded shadow-lg flex flex-col space-y-2"
          >
            <!-- Buttons for changing colors -->
            <button
              v-for="color in availableColors"
              :key="color"
              :class="`w-8 h-8 rounded-full border-2 border-gray-700 hover:scale-110 bg-${color}`"
              @click="changeColor(color)"
            ></button>
          </div>
        </div>
  
        <!-- Hire Me Button -->
        <button
          class="px-4 py-2 rounded hover:opacity-90"
          :class="`bg-${primaryColor}`"
        >
          Hire Me
        </button>
      </div>
    </header>
  </template>
  
  <script setup>
  import Logo from './Logo.vue';
  import NavBar from './NavBar.vue';
  import { useColorPaletteStore } from '../stores/colorPalette';
  import { ref } from 'vue';
  
  const { primaryColor, setPrimaryColor } = useColorPaletteStore();
  const dropdownOpen = ref(false);
  
  // Available colors match Tailwind config
  const availableColors = ['orange', 'green', 'blue', 'pink', 'yellow'];
  
  function toggleDropdown() {
    dropdownOpen.value = !dropdownOpen.value;
  }
  
  function changeColor(color) {
    setPrimaryColor(color); // Update Pinia state
    dropdownOpen.value = false;
  }
  </script>
  