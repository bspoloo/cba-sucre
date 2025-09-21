<template>
  <div>
    <UserDetails v-if="authStore.isLoggedIn" />
    <LoginUser v-else @login="handleLogin" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import api from "@/plugins/axios";
import { useToast } from 'primevue/usetoast';
import LoginUser from '@/components/admin/LoginUser.vue';
import UserDetails from '@/components/user/UserDetails.vue';
import { useAuthStore } from '@/stores';

const authStore = useAuthStore();
const toast = useToast();
const errorMessage = ref("");

const handleLogin = async (values: any) => {
  errorMessage.value = "";

  try {
    const response = await api.post(`${import.meta.env.VITE_BASE_URL_API}/auth/login`, {
      usuario: values.username,
      clave: values.password,
    });
    
    console.log(response);
    
    // Guardar datos de autenticación
    authStore.login(values.username, values.password);

    const { data } = response;
    console.log(data);
    
    if (data) {
      toast.add({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Inicio de sesión exitoso',
        life: 3000
      });

      // router.push('/dashboard');
    } else {
      errorMessage.value = "Credenciales incorrectas. Inténtalo de nuevo.";
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Credenciales incorrectas',
        life: 3000
      });
    }
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    errorMessage.value = "Ocurrió un error al iniciar sesión. Inténtalo más tarde.";

    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Error al iniciar sesión',
      life: 3000
    });
  }
};
</script>