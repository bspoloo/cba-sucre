<template>
    <div class="login">
        <Toast />
        <h1>Iniciar Sesión</h1>
        <Form @submit="handleLogin" :validation-schema="schema" v-slot="{ errors, meta }">
            <div class="p-field mb-3">
                <Field name="username" v-slot="{ field }">
                    <InputText id="username" v-bind="field" placeholder="Ingresa tu usuario"
                        :class="{ 'p-invalid': errors.username }" style="width: 250px;" />
                </Field>
                <small class="p-error">{{ errors.username }}</small>
            </div>
            <div class="p-field mb-3">
                <Field name="password" v-slot="{ field }">
                    <Password id="password" v-bind="field" placeholder="Ingresa tu contraseña" toggleMask
                        :class="{ 'p-invalid': errors.password }" style="width: 250px;" />
                </Field>
                <small class="p-error">{{ errors.password }}</small>
            </div>
            <Button type="submit" label="Ingresar" class="w-full" :disabled="!meta.valid" />
        </Form>

        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from "@/plugins/axios";
import { useToast } from 'primevue/usetoast';
import Toast from 'primevue/toast';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import { Form, Field } from 'vee-validate';
import * as yup from 'yup';
import router from '@/router';
import { useAuthStore } from '@/stores';

const toast = useToast();
const errorMessage = ref("");
const authStore = useAuthStore();
// Esquema de validación
const schema = yup.object({
    username: yup.string().required('El usuario es requerido'),
    password: yup.string().required('La contraseña es requerida'),
});

const handleLogin = async (values: any) => {
    errorMessage.value = "";

    try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL_API}/auth/login`, {
            usuario: values.username,
            clave: values.password,
        });

        authStore.login(values.username, values.password);

        const { data } = response;

        if (data) {
            toast.add({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Inicio de sesión exitoso',
                life: 3000
            });

            router.push('/');
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

<style scoped>
.login {
    max-width: 300px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
    font-family: Arial, sans-serif;
}

.login h1 {
    text-align: center;
    margin-bottom: 20px;
}

.form-group {
    margin-bottom: 15px;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}

.form-group :deep(.p-inputtext) {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
}

:deep(.p-button) {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

:deep(.p-button):hover {
    background-color: #0056b3;
}

.error-message {
    color: red;
    margin-top: 10px;
    text-align: center;
}

.p-error {
    color: #e24c4c;
    font-size: 0.875rem;
    margin-top: 0.25rem;
    display: block;
}
</style>