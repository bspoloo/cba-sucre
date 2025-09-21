<!-- views/Unauthorized.vue -->
<template>
    <div class="unauthorized-container">
        <div class="unauthorized-card">
            <h1>Acceso No Autorizado</h1>
            <p>No tienes permisos para acceder a esta página.</p>
            <button @click="goHome" class="btn btn-primary">Volver al Inicio</button>
            <button @click="goBack" class="btn btn-secondary">Volver Atrás</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const goHome = () => {
    router.push('/');
};

const goBack = () => {
    router.go(-1);
};
</script>

<style scoped>
.unauthorized-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 60vh;
    padding: 2rem;
}

.unauthorized-card {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
    max-width: 400px;
    width: 100%;
}

h1 {
    color: #dc3545;
    margin-bottom: 1rem;
}

p {
    margin-bottom: 2rem;
    color: #6c757d;
}

.btn {
    margin: 0 0.5rem;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    text-decoration: none;
    display: inline-block;
}

.btn-primary {
    background-color: #007bff;
    color: white;
}

.btn-secondary {
    background-color: #6c757d;
    color: white;
}
</style>