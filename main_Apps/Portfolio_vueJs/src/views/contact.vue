<template>
    <div class="contact">
      <h1>Contact Me</h1>
      <form @submit.prevent="submitForm">
        <input v-model="name" type="text" placeholder="Your Name" required />
        <input v-model="email" type="email" placeholder="Your Email" required />
        <textarea v-model="message" placeholder="Your Message" required></textarea>
        <button type="submit">Send</button>
      </form>
      <p>$$$$$$$$$</p> <!-- Add extra info here -->
    </div>
  </template>
  
  <script>
  export default {
    name: 'Contact',
    data() {
      return {
        name: '',
        email: '',
        message: ''
      }
    },
    methods: {
      submitForm() {
        alert('Message sent!');
        // Logic to handle form submission
      }
    }
  }
  </script>
  
  <style scoped>
  .contact {
    padding: 20px;
  }
  form {
    display: flex;
    flex-direction: column;
  }
  input, textarea {
    margin-bottom: 10px;
    padding: 10px;
    width: 300px;
  }
  button {
    padding: 10px;
    background-color: #333;
    color: white;
    border: none;
  }
  </style>
  