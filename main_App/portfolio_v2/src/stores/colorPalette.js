import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useColorPaletteStore = defineStore('colorPalette', () => {
  // Default primary color (matches Tailwind config)
  const primaryColor = ref('primary'); // Name of the Tailwind class

  // Set a new primary color
  function setPrimaryColor(color) {
    primaryColor.value = color;
  }

  return { primaryColor, setPrimaryColor };
});
