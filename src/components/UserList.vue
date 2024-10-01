<template>
  <div class="user-list-container">
    <h1>Usuários</h1>
    <button class="add-user-btn" @click="openModal()">Adicionar Usuário</button>
    <table>
      <thead>
        <tr>
          <th @click="sortBy('name')">Nome</th>
          <th @click="sortBy('email')">Email</th>
          <th @click="sortBy('phone')">Phone</th>
          <th @click="sortBy('document')">Documento</th>
          <th @click="sortBy('monthlyIncome')">Salário</th>
          <th @click="sortBy('status')">Endereço</th>
          <th @click="sortBy('status')">Status</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in sortedUsers" :key="user.id">
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.phone }}</td>
          <td>{{ user.document }}</td>
          <td>{{ user.monthlyIncome }}</td>
          <td>{{ user.address }}</td>
          <td>{{ user.status }}</td>
          <td>
            <button class="edit-btn" @click="openModal(user)">Editar</button>
            <button class="delete-btn" @click="deleteUser(user.id)">Excluir</button>
          </td>
        </tr>
      </tbody>
    </table>

    <UserForm v-if="isModalOpen" :editUser="selectedUser" @close="closeModal" />
  </div>
</template>

<script lang="ts">
import { computed, ref } from 'vue';
import { useUserStore, type User } from '../stores/userStore';
import UserForm from './UserForm.vue';

export default {
  components: { UserForm },
  setup() {
    const store = useUserStore();
    const isModalOpen = ref(false);
    const selectedUser = ref<User | null>(null);

    const openModal = (user: User | null = null) => {
      selectedUser.value = user;
      isModalOpen.value = true;
    };

    const closeModal = () => {
      isModalOpen.value = false;
      selectedUser.value = null;
    };

    const deleteUser = (userId: number) => {
      if (confirm('Você tem certeza que deseja excluir este usuário?')) {
        store.deleteUser(userId);
      }
    };

    const sortBy = (key: string) => {};

    const sortedUsers = computed(() => store.users);

    return {
      isModalOpen,
      openModal,
      closeModal,
      deleteUser,
      sortedUsers,
      sortBy,
      selectedUser,
    };
  },
};
</script>

<style scoped>
.user-list-container {
  padding: 20px;
}

h1 {
  color: #343a40;
}

.add-user-btn {
  background-color: #28a745;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 20px;
}

.add-user-btn:hover {
  background-color: #218838;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

th, td {
  padding: 10px;
  text-align: left;
  border: 1px solid #ddd;
}

th {
  cursor: pointer;
}

th:hover {
  background-color: #f1f1f1;
}

.edit-btn {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
}

.edit-btn:hover {
  background-color: #0056b3;
}

.delete-btn {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
}

.delete-btn:hover {
  background-color: #c82333;
}
</style>
