// plugins/axios.ts
import { useAuthStore } from '@/stores'
import Axios from 'axios'
import { getActivePinia } from 'pinia'


const axios = Axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_ENDPOINT
})

axios.interceptors.request.use(config => {
  const pinia = getActivePinia() // ✅ obtiene la instancia de Pinia activa
  if (!pinia) return config      // si no hay Pinia activo, no agregamos token

  const authStore = useAuthStore(pinia)
  if (config.headers) {
    config.headers['Content-Type'] = 'application/json'
    if (authStore.token) {
      config.headers['Authorization'] = `Bearer ${authStore.token}`
    }
  }
  return config
})

export default axios
