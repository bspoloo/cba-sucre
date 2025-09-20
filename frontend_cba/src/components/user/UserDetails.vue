<template>
    <div class="user-card">
        <h2>Bienvenido, {{ authStore.user?.name }}</h2>
        <p><strong>Email:</strong> {{ authStore.user?.email }}</p>
        <p><strong>Rol:</strong> {{ authStore.user?.rol }}</p>
        <button @click="authStore.logout">Cerrar sesión</button>
    </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
</script>

<style scoped>
.user-card {
    max-width: 400px;
    margin: 2rem auto;
    padding: 1.5rem;
    border: 1px solid #ddd;
    border-radius: 10px;
    background: #f9f9f9;
    font-family: Arial, sans-serif;
    text-align: left;
}

.user-card h2 {
    margin-bottom: 1rem;
    color: #007bff;
}

.user-card p {
    margin: 0.3rem 0;
}

.user-card button {
    margin-top: 1rem;
    padding: 0.6rem 1rem;
    background: #dc3545;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
}

.user-card button:hover {
    background: #c82333;
}
</style>
