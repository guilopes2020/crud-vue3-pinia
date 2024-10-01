<template>
  <div class="modal">
    <div class="modal-content">
      <h2>{{ isEditing ? 'Editar Usuário' : 'Adicionar Usuário' }}</h2>
      <form @submit.prevent="submitForm">
        <input v-model="user.name" placeholder="Nome" required />
        <input v-model="user.email" placeholder="Email" required type="email" />
        <input v-model="user.phone" placeholder="Telefone" required />
        <input v-model="user.document" placeholder="CPF/CNPJ" required />
        <input v-model.number="user.monthlyIncome" placeholder="Ganho Mensal" required />
        <select v-model="user.status">
          <option value="active">Ativo</option>
          <option value="inactive">Inativo</option>
        </select>
        <input v-model="cep" @blur="fetchAddress" placeholder="CEP" required />
        <input v-model="user.address" placeholder="Endereço" required />

        <button type="submit" :disabled="isLoading">{{ isLoading ? 'Carregando...' : (editUser ? 'Salvar' : 'Cadastrar') }}</button>
        <button type="button" @click="close">Cancelar</button>
      </form>
      <button class="close" @click="$emit('close')">Fechar</button>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted } from 'vue';
import { useUserStore, type User } from '../stores/userStore';
import axios from 'axios';
import { useMessageStore } from '../stores/messageStore';

export default defineComponent({
  props: {
    editUser: {
      type: Object as () => User | null,
      default: null,
    },
  },
  setup(props, { emit }) {
    const store = useUserStore();
    const isEditing = ref(false);
    const user = ref<User>({
      id: 0,
      name: '',
      email: '',
      phone: '',
      document: '',
      monthlyIncome: 0,
      status: 'active',
      address: '',
    });
    const cep = ref('');

    const isLoading = ref(false);
    const messageStore = useMessageStore(); // Usando a store de mensagens

    // Se estivermos editando um usuário, preencher os dados no formulário
    onMounted(() => {
      if (props.editUser) {
        user.value = { ...props.editUser };
        isEditing.value = true;
        cep.value = ''; // Limpa o CEP caso haja mudança de endereço
      }
    });

    const fetchAddress = async () => {
      if (cep.value) {
        try {
          const { data } = await axios.get(`https://viacep.com.br/ws/${cep.value}/json/`);
          user.value.address = `${data.logradouro}, ${data.bairro}, ${data.localidade}, ${data.uf}`;
        } catch (error) {
          store.setError('Erro ao buscar endereço pelo CEP.');
        }
      }
    };

    const submitForm = () => {
      store.setLoading(true);
      isLoading.value = true;
      setTimeout(() => {
        if (isEditing.value) {
          store.editUser(user.value);
          messageStore.setMessage('Usuário cadastrado/atualizado com sucesso!', 'success');
        } else {
          store.addUser(user.value);
          messageStore.setMessage('Usuário cadastrado/atualizado com sucesso!', 'success');
        }
        store.setLoading(false);
        emit('close'); // Fechar o modal após o submit
      }, 1000);
    };

    const close = () => emit('close');

    return {
      user,
      cep,
      isEditing,
      isLoading,
      fetchAddress,
      submitForm,
      close,
    };
  },
});
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  width: 400px;
}

h2 {
  margin-bottom: 15px;
  color: #343a40;
}

input, select {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ced4da;
  border-radius: 5px;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}

.close {
  background-color: #dc3545;
  margin-top: 10px;
  width: 100%;
}

.close:hover {
  background-color: #c82333;
}
</style>
