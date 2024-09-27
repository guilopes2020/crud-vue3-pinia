<template>
  <div>
    <div class="filters">
      <input v-model="filters.name" placeholder="Filtrar por nome" />
      <input v-model="filters.email" placeholder="Filtrar por email" />
      <input v-model="filters.cpfCnpj" placeholder="Filtrar por CPF/CNPJ" />
      <select v-model="filters.status">
        <option value="">Todos os Status</option>
        <option value="active">Ativo</option>
        <option value="inactive">Inativo</option>
      </select>
    </div>

    <table>
      <thead>
        <tr>
          <th @click="sortBy('name')">Nome <span v-if="sort.column === 'name'">{{ sortDirection }}</span></th>
          <th @click="sortBy('email')">Email <span v-if="sort.column === 'email'">{{ sortDirection }}</span></th>
          <th @click="sortBy('phone')">Telefone <span v-if="sort.column === 'phone'">{{ sortDirection }}</span></th>
          <th @click="sortBy('cpfCnpj')">CPF/CNPJ <span v-if="sort.column === 'cpfCnpj'">{{ sortDirection }}</span></th>
          <th @click="sortBy('monthlyIncome')">Ganho Mensal <span v-if="sort.column === 'monthlyIncome'">{{ sortDirection }}</span></th>
          <th @click="sortBy('status')">Status <span v-if="sort.column === 'status'">{{ sortDirection }}</span></th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in filteredUsers" :key="user.id">
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.phone }}</td>
          <td>{{ user.cpfCnpj }}</td>
          <td>{{ user.monthlyIncome }}</td>
          <td>{{ user.status === 'active' ? 'Ativo' : 'Inativo' }}</td>
          <td>
            <button @click="$emit('edit', user)">Editar</button>
            <button @click="$emit('delete', user.id)">Excluir</button>
          </td>
        </tr>
      </tbody>
    </table>

  </div>
</template>
  
  <script lang="ts">
  import { defineComponent, ref, computed } from 'vue';
  import type { User } from '../stores/userStore';
  
  export default defineComponent({
    props: {
      users: {
        type: Array as () => User[],
        required: true,
      },
    },
    setup(props) {
      const filters = ref({
        name: '',
        email: '',
        cpfCnpj: '',
        status: '',
      });
  
      const sort = ref({
        column: '',
        direction: 'asc' as 'asc' | 'desc',
      });
  
      const sortBy = (column: keyof User) => {
        if (sort.value.column === column) {
          sort.value.direction = sort.value.direction === 'asc' ? 'desc' : 'asc';
        } else {
          sort.value.column = column;
          sort.value.direction = 'asc';
        }
      };
  
      const filteredUsers = computed(() => {
        let filtered = props.users.filter(user => {
          return (
            (!filters.value.name || user.name.toLowerCase().includes(filters.value.name.toLowerCase())) &&
            (!filters.value.email || user.email.toLowerCase().includes(filters.value.email.toLowerCase())) &&
            (!filters.value.cpfCnpj || user.cpfCnpj.includes(filters.value.cpfCnpj)) &&
            (!filters.value.status || user.status === filters.value.status)
          );
        });
  
        if (sort.value.column) {
          filtered.sort((a, b) => {
            const sortValue = sort.value.direction === 'asc' ? 1 : -1;
            if (a[sort.value.column] < b[sort.value.column]) return -sortValue;
            if (a[sort.value.column] > b[sort.value.column]) return sortValue;
            return 0;
          });
        }
  
        return filtered;
      });
  
      const sortDirection = computed(() => (sort.value.direction === 'asc' ? '↑' : '↓'));
  
      return {
        filters,
        filteredUsers,
        sortBy,
        sortDirection,
        sort,
      };
    },
  });
  </script>
  
  <style scoped>
  .filters {
    margin-bottom: 1rem;
  }
  
  .filters input,
  .filters select {
    margin-right: 10px;
  }
  
  th {
    cursor: pointer;
    user-select: none;
  }
  
  th span {
    margin-left: 5px;
  }
  </style>
  