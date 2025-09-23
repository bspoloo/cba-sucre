// plugins/axios.ts
import { useAuthStore } from '@/stores'
import Axios from 'axios'
import { getActivePinia } from 'pinia'


const api = Axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_API
})

api.interceptors.request.use(config => {
  const pinia = getActivePinia()
  if (!pinia) return config

  const authStore = useAuthStore(pinia)
  console.log("Token: ", authStore);
  if (config.headers) {
    config.headers['Content-Type'] = 'application/json'
    if (authStore.accessToken) {
      config.headers['Authorization'] = `Bearer ${authStore.accessToken}`
    }
  }

  return config
})

export default api
