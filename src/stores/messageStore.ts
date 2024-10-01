import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMessageStore = defineStore('messageStore', () => {
  const message = ref('');
  const messageType = ref<'success' | 'error' | ''>('');

  const setMessage = (text: string, type: 'success' | 'error') => {
    message.value = text;
    messageType.value = type;
    setTimeout(() => {
      clearMessage();
    }, 3000);
  };

  const clearMessage = () => {
    message.value = '';
    messageType.value = '';
  };

  return { message, messageType, setMessage, clearMessage };
});
