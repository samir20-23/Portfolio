<template>
  <div id="app">
    <nav>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/about">About</router-link></li>
        <li><router-link to="/projects">Projects</router-link></li>
        <li><router-link to="/contact">Contact</router-link></li>
      </ul>
    </nav>
    <router-view></router-view> <!-- This is where the view will be injected -->
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped>
nav {
  background-color: #333;
  padding: 10px;
  color: white;
}
ul {
  list-style-type: none;
  display: flex;
  gap: 10px;
}
a {
  color: white;
  text-decoration: none;
}
</style>
