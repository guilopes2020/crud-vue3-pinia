<template>
  <form @submit.prevent="submitForm">
    <div>
      <label for="zipCode">CEP:</label>
      <input id="zipCode" v-model="user.address.zipCode" @blur="fetchAddressFromCEP" required />
    </div>
    <div>
      <label for="street">Endereço - Rua:</label>
      <input id="street" v-model="user.address.street" required />
    </div>
    <div>
      <label for="city">Cidade:</label>
      <input id="city" v-model="user.address.city" required />
    </div>
    <div>
      <label for="state">Estado:</label>
      <input id="state" v-model="user.address.state" required />
    </div>
    <button type="submit">{{ isLoading ? 'Salvando...' : (isEditing ? 'Atualizar' : 'Adicionar') }} Usuário</button>
    <div v-if="message" class="message-success">{{ message }}</div>
    <div v-if="error" class="message-error">{{ error }}</div>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from 'axios';

export default defineComponent({
  props: {
    initialUser: {
      type: Object,
      required: true,
    },
    isEditing: Boolean,
  },
  emits: ['submit'],
  setup(props, { emit }) {
    const user = ref({ ...props.initialUser });

    const fetchAddressFromCEP = async () => {
      const cep = user.value.address.zipCode.replace(/\D/g, '');
      if (cep.length === 8) {
        try {
          const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
          if (response.data.erro) {
            alert('CEP não encontrado');
          } else {
            user.value.address.street = response.data.logradouro;
            user.value.address.city = response.data.localidade;
            user.value.address.state = response.data.uf;
          }
        } catch (error) {
          alert('Erro ao buscar o endereço. Tente novamente.');
        }
      }
    };

    const submitForm = () => {
      emit('submit', user.value);
    };

    return {
      user,
      fetchAddressFromCEP,
      submitForm,
    };
  },
});
</script>
