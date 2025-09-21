// stores/auth.ts
import { defineStore } from 'pinia'
import http from '@/plugins/axios'
import router from '@/router'
import axios from '@/plugins/axios'

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
    async login(usuario: string, clave: string) {
      try {
        const response = await http.post('auth/login', { usuario, clave })
        const { accessToken, refreshToken, user } = response.data

        this.user = user
        this.accessToken = accessToken
        this.refreshToken = refreshToken

        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('refreshToken', refreshToken)

        router.push(this.returnUrl || '/')
      } catch (err) {
        console.error('Error en login', err)
        throw err
      }
    },
    async logout() {
      try {
        await axios.post("/auth/logout");
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
