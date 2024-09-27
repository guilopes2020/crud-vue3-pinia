import { defineStore } from 'pinia';

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  cpfCnpj: string;
  monthlyIncome: number;
  status: 'active' | 'inactive';
  address: Address;
}

export const useUserStore = defineStore('userStore',  {
  state: () => ({
    users: [] as User[],
    nextId: 1,
    isLoading: false,
    message: '',
    error: '',
  }),
  actions: {
    async addUser(user: Omit<User, 'id'>) {
      try {
        this.isLoading = true;
        this.message = '';
        this.error = '';

        await new Promise((resolve) => setTimeout(resolve, 2000));

        this.users.push({ ...user, id: this.nextId });
        this.nextId++;
        this.message = 'Usuário cadastrado com sucesso!';
      } catch (error) {
        this.error = 'Erro ao cadastrar o usuário.';
      } finally {
        this.isLoading = false;
      }
    },

    async updateUser(updatedUser: User) {
      try {
        this.isLoading = true;
        this.message = '';
        this.error = '';

        await new Promise((resolve) => setTimeout(resolve, 2000));

        const index = this.users.findIndex(user => user.id === updatedUser.id);
        if (index !== -1) {
          this.users[index] = updatedUser;
          this.message = 'Usuário atualizado com sucesso!';
        } else {
          this.error = 'Usuário não encontrado.';
        }
      } catch (error) {
        this.error = 'Erro ao atualizar o usuário.';
      } finally {
        this.isLoading = false;
      }
    },

    deleteUser(id: number) {
      this.users = this.users.filter(user => user.id !== id);
      this.message = 'Usuário excluído com sucesso!';
    },

    clearMessages() {
      this.message = '';
      this.error = '';
    },
  },
});
