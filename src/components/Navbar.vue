<template>
    <div class="navbar" v-if="isAuthenticated">
      <div class="left">
        <img :src="user?.avatar" alt="Avatar" />
        <span>{{ user?.name }}</span>
      </div>
      <div class="nav">
        <router-link to="/">Home</router-link>
        <router-link to="/settings">Configurações</router-link>
        <router-link to="/profile">Perfil</router-link>
      </div>
      <button @click="logout">Sair</button>
    </div>
  </template>
  
  <script lang="ts">
  import { useAuthStore } from '../stores/authStore';
  
  export default {
    setup() {
      const authStore = useAuthStore();
  
      const logout = () => {
        authStore.logout();
      };
  
      return {
        user: authStore.user,
        isAuthenticated: authStore.isAuthenticated,
        logout,
      };
    },
  };
  </script>
  
  <style scoped>
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    background-color: #343a40;
    color: white;
  }
  
  .left {
    display: flex;
    align-items: center;
  }
  
  .left img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
  }

  .nav {
    margin: auto;
    display: flex;
  }

  .nav a {
        color: #FCBA03;
        text-decoration: none;
        margin: 12px;
        transition: .5s;
  }

  .nav a:hover {
        color: #FFF;
    }
  
  button {
    background-color: #dc3545;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #c82333;
  }
  </style>
  