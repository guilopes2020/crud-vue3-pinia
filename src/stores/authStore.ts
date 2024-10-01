import { defineStore } from 'pinia';

interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    isAuthenticated: false,
  }),
  actions: {
    login(email: string, password: string) {
      // Simulação de login (a lógica de autenticação real seria feita com uma API)
      if (email === 'admin@example.com' && password === '123456') {
        this.user = {
          id: 1,
          name: 'Admin User',
          email: 'admin@example.com',
          avatar: 'https://avatars.githubusercontent.com/u/60366082?v=4', // Placeholder para o avatar
        };
        this.isAuthenticated = true;
      } else {
        throw new Error('Credenciais inválidas');
      }
    },
    logout() {
      this.user = null;
      this.isAuthenticated = false;
    },
  },
});
