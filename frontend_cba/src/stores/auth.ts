import type { Usuario } from '@/interfaces/usuario.interface';
import axios from '@/plugins/axios';
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import router from '@/router'

export const useAuthStore = defineStore('auth', () => {
  
  const accessToken = ref<string | null>(null);
  const user = ref<Usuario | null>(null);
  const isLoggedIn = computed(() => !!accessToken.value);

  function setAuth(token: string, userData: Usuario): void {
    accessToken.value = token;
    user.value = userData;
    
  }

  function clearAuth(): void {
    accessToken.value = null;
    user.value = null;
  }

  async function refresh(): Promise<boolean> {
    try {
      const res = await axios.get("/auth/refresh");
      if (res.data?.acccessToken) {
        setAuth(res.data.acccessToken, res.data.user ?? null);
        return true;
      }
    } catch (e) {
      clearAuth();
    }
    return false;
  }

  async function logout() {
    try {
      await axios.post("/auth/logout"); // opcional si backend invalida refresh token
    } catch (e) {
      console.warn("Error al cerrar sesión", e);
    } finally {
      clearAuth();
      router.push('/login');
    }
  }

  return { accessToken, user, isLoggedIn, setAuth, clearAuth, refresh, logout }
});
