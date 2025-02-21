<template>
    <div class="container">
      <h1>Vue Logic Test</h1>
  
      <!-- Conditional Rendering Example -->
      <p v-if="isLoggedIn">Welcome back, user!</p>
      <p v-else>Please log in</p>
  
      <!-- Looping Example: Show List -->
      <ul>
        <li v-for="item in items" :key="item.id">{{ item.name }}</li>
      </ul>
  
      <!-- Event Handling Example -->
      <button @click="toggleLogin">{{ buttonText }}</button>
  
      <!-- Two-Way Binding Example -->
      <input v-model="newItem" placeholder="Add new item">
      <button @click="addItem">Add Item</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isLoggedIn: false,
        items: [
          { id: 1, name: 'Project 1' },
          { id: 2, name: 'Project 2' },
          { id: 3, name: 'Project 3' }
        ],
        newItem: ''
      };
    },
    computed: {
      buttonText() {
        return this.isLoggedIn ? 'Log Out' : 'Log In';
      }
    },
    methods: {
      toggleLogin() {
        this.isLoggedIn = !this.isLoggedIn;
      },
      addItem() {
        if (this.newItem) {
          this.items.push({ id: this.items.length + 1, name: this.newItem });
          this.newItem = '';
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 600px;
    margin: 20px auto;
  }
  button {
    margin-top: 10px;
  }
  </style>
    