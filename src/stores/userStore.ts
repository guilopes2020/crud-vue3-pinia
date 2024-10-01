import { defineStore } from 'pinia';

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  document: string;
  monthlyIncome: number;
  status: 'active' | 'inactive';
  address: string;
}

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [] as User[],
    isLoading: false,
    errorMessage: '',
  }),
  actions: {
    addUser(user: User) {
      this.users.push({ ...user, id: this.users.length + 1 });
    },
    editUser(updatedUser: User) {
      const index = this.users.findIndex((u) => u.id === updatedUser.id);
      if (index !== -1) {
        this.users[index] = updatedUser;
      }
    },
    deleteUser(userId: number) {
      this.users = this.users.filter((user) => user.id !== userId);
    },
    setLoading(loading: boolean) {
      this.isLoading = loading;
    },
    setError(message: string) {
      this.errorMessage = message;
    },
  },
});
