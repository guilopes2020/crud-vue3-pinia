<template>
  <div class="app">
    <header class="toolbar">
      <div class="user-info">
        <img class="avatar" :src="user.avatarUrl" alt="Avatar" />
        <span>{{ user.name }}</span>
      </div>
      <h1 class="title">Crud Vue3 PInia</h1>
      <button @click="toggleMenu" class="menu-button">☰</button>
      
    </header>

    <nav :class="['sidebar', { 'collapsed': isMenuCollapsed }]">
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/users">Usuários</router-link></li>
        <li><router-link to="/settings">Configurações</router-link></li>
      </ul>
    </nav>

    <main class="content">
      <router-view></router-view>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const isMenuCollapsed = ref(false);
    const toggleMenu = () => {
      isMenuCollapsed.value = !isMenuCollapsed.value;
    };

    const user = {
      name: "Guilherme Lopes",
      avatarUrl: "https://avatars.githubusercontent.com/u/60366082?v=4&size=64" 
    };

    return {
      isMenuCollapsed,
      toggleMenu,
      user,
    };
  },
});
</script>

<style scoped>
.app {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0 auto;
  height: 100vh;
}

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #333;
  color: white;
  width: 100%;
  height: 100px;
  
}

.title {
  text-align: center;
}

.menu-button {
  font-size: 1.5rem;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
}

.user-info {
  display: flex;
  align-items: center;
}

.avatar {
  border-radius: 50%;
  margin-right: 10px;
}

.sidebar {
  width: 200px;
  background-color: #444;
  color: white;
  transition: width 0.3s;
}

.sidebar.collapsed {
  width: 60px;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar li {
  padding: 10px;
}

.sidebar a {
  color: white;
  text-decoration: none;
  transition: .5s;
}

.sidebar a:hover {
  color: blue;
}

.content {
  display: flex;
  justify-content: center;
  padding: 2rem;
}
</style>
