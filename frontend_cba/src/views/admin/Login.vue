<script setup lang="ts">
import { useAuthStore } from '@/stores'
import { useToast } from 'primevue/usetoast'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const authStore = useAuthStore()
const router = useRouter()
const toast = useToast();

async function handleLogin() {
  const loginResult = await authStore.login(username.value, password.value)
  if (loginResult.success) {
    toast.add({
      severity: 'success',
      summary: 'Éxito',
      detail: 'Inicio de sesión exitoso en el administrador',
      life: 3000
    });
    
    setTimeout(() => {
      router.push('/admin')
    }, 500)
    
  } else {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: `Error: ${loginResult.message}`,
      life: 3000
    });
  }
}
</script>

<template>
  <div class="container mt-5" style="max-width: 400px;">
    <h3 class="mb-3 text-center">Login Administrador</h3>
    <div class="card p-4 shadow">
      <div class="mb-3">
        <label class="form-label">Usuario</label>
        <input v-model="username" type="text" class="form-control" />
      </div>
      <div class="mb-3">
        <label class="form-label">Contraseña</label>
        <input v-model="password" type="password" class="form-control" />
      </div>
      <button class="btn btn-primary w-100" @click="handleLogin">
        Ingresar
      </button>
    </div>
  </div>
</template>