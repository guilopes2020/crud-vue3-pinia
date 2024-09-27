<template>
    <div class="modal-overlay" v-if="isOpen">
      <div class="modal">
        <header class="modal-header">
          <h3>{{ title }}</h3>
          <button @click="closeModal" class="close-button">&times;</button>
        </header>
        <div class="modal-body">
          <slot></slot>
        </div>
        <footer class="modal-footer">
          <slot name="footer"></slot>
        </footer>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    props: {
      isOpen: {
        type: Boolean,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
    },
    emits: ['close'],
    setup(_, { emit }) {
      const closeModal = () => {
        emit('close');
      };
  
      return { closeModal };
    },
  });
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal {
    background: white;
    padding: 1.5rem;
    border-radius: 8px;
    width: 500px;
    max-width: 90%;
  }
  
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }
  
  .close-button {
    font-size: 1.5rem;
    background: none;
    border: none;
    cursor: pointer;
  }
  
  .modal-footer {
    margin-top: 1rem;
    display: flex;
    justify-content: flex-end;
  }
  </style>
  