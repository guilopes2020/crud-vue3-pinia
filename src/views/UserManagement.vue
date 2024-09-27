<template>
  <div class="main-container">
    <h1>Gerenciamento de Usuários</h1>

    <button @click="openModal()">Adicionar Usuário</button>

    <UserList :users="users" @edit="startEditing" @delete="deleteUser" />

    <ModalUser v-if="isModalOpen" :title="modalTitle" @close="closeModal">
      <UserForm
        :initialUser="editingUser"
        :isEditing="isEditing"
        @submit="isEditing ? updateUser : addUser"
      />
    </ModalUser>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useUserStore, type User } from '../stores/userStore';
import UserForm from '../components/UserForm.vue';
import UserList from '../components/UserList.vue';
import ModalUser from '../components/ModalUser.vue';


export default defineComponent({
  components: {
    UserForm,
    UserList,
    ModalUser,
  },
  setup() {
    const userStore = useUserStore();
    const editingUser = ref<User | null>(null);
    const isModalOpen = ref(false);
    const isEditing = ref(false);

    const modalTitle = ref('Adicionar Usuário');

    const openModal = (user: User | null = null) => {
      isModalOpen.value = true;
      if (user) {
        editingUser.value = { ...user };
        isEditing.value = true;
        modalTitle.value = 'Editar Usuário';
      } else {
        editingUser.value = {
          name: '',
          email: '',
          phone: '',
          cpfCnpj: '',
          monthlyIncome: 0,
          status: 'active',
          address: {
            zipCode: '',
            street: '',
            city: '',
            state: '',
          },
        };
        isEditing.value = false;
        modalTitle.value = 'Adicionar Usuário';
      }
    };

    const closeModal = () => {
      isModalOpen.value = false;
      editingUser.value = null;
    };

    const addUser = (user: Omit<User, 'id'>) => {
      userStore.addUser(user);
      closeModal();
    };

    const updateUser = (user: User) => {
      userStore.updateUser(user);
      closeModal();
    };

    const deleteUser = (id: number) => {
      userStore.deleteUser(id);
    };

    const startEditing = (user: User) => {
      openModal(user);
    };

    return {
      users: userStore.users,
      editingUser,
      isModalOpen,
      isEditing,
      modalTitle,
      openModal,
      closeModal,
      addUser,
      updateUser,
      deleteUser,
      startEditing,
    };
  },
});
</script>

<style scoped>
button {
  margin-bottom: 1rem;
}
</style>
