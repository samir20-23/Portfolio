<template>
    <div class="projects">
      <h1>Projects</h1>
      <ul>
        <li v-for="project in projects" :key="project.id">
          <h2>{{ project.name }}</h2>
          <p>{{ project.description }}</p>
          <p>$$$$$$$$$</p> <!-- Add specific details or updates for each project -->
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Projects',
    data() {
      return {
        projects: [
          { id: 1, name: 'Project 1', description: 'Description of Project 1' },
          { id: 2, name: 'Project 2', description: 'Description of Project 2' },
          { id: 3, name: 'Project 3', description: 'Description of Project 3' }
        ]
      }
    }
  }
  </script>
  
  <style scoped>
  .projects {
    padding: 20px;
  }
  ul {
    list-style-type: none;
  }
  li {
    margin: 10px 0;
  }
  </style>
  