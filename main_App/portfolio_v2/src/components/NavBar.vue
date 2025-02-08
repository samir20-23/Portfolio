<template>
    <nav>
      <ul>
        <li class="space-x-6">
          <router-link
            v-for="route in routes"
            :key="route.name"
            :to="route.path"
            class="hover:text-secondary"
          >
            {{ route.name }}
          </router-link>
        </li>
      </ul>
    </nav>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const routes = router.options.routes.filter((route) => route.name); // Get routes with a `name` property
  </script>
  