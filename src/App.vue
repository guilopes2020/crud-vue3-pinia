<template>
  <div class="app-container">
    <Navbar />
    <main>
      <router-view />
    </main>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import Navbar from './components/Navbar.vue';

export default {
  components: {
    Navbar,
  },
  setup() {
    const menuOpen = ref(true);
    const toggleMenu = () => (menuOpen.value = !menuOpen.value);

    return { menuOpen, toggleMenu };
  },
};
</script>

<style>
.app-container {
  font-family: Arial, sans-serif;
  background-color: #f8f9fa;
  min-height: 100vh;
  padding: 0;
}
</style>