// stores/auth.ts
import { defineStore } from 'pinia'
import http from '@/plugins/axios'
import router from '@/router'
import api from '@/plugins/axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    accessToken: localStorage.getItem('accessToken') || '',
    refreshToken: localStorage.getItem('refreshToken') || '',
    returnUrl: ''
  }),
  getters: {
    isLoggedIn: (state) => !!state.accessToken
  },
  actions: {
    async login(usuario: string, clave: string) : Promise<{message: string, success: boolean}>{
      try {
        const response = await api.post(`${import.meta.env.VITE_BASE_URL_API}/auth/login`, { usuario, clave })
        const { accessToken, refreshToken, user } = response.data        
        this.user = user
        this.accessToken = accessToken
        this.refreshToken = refreshToken

        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('refreshToken', refreshToken)

        router.push(this.returnUrl || '/')
        return {
          message: 'Loggeo exitoso',
          success: true
        };
      } catch (err) {
        console.error('Error en login', err)
        // throw err
        return {
          message: `Error en inicio de sesion ${typeof err === 'object' && err !== null && 'message' in err ? (err as { message: string }).message : String(err)}`,
          success: false
        };
      }
    },
    async logout() {
      try {
        await api.post("/auth/logout");
      } catch (e) {
        console.warn("Error al cerrar sesión", e);
      } finally {
        localStorage.clear()
        this.$reset();
        router.push('/login');
      }
    }
  }
})
