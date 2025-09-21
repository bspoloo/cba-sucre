<script setup lang="ts">
import { useAuthStore } from '@/stores'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const menuOpen = ref(true)

const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard' },
    { name: 'Estudiantes', path: '/admin/estudiantes' },
    { name: 'Docentes', path: '/admin/docentes' },
    { name: 'Materias', path: '/admin/materias' },
]
const authStore = useAuthStore();
const isAdmin = computed(() => authStore.isAdmin);
const logout = () => {
    authStore.logout();
}

onMounted(() => {
    if (!authStore.isLoggedIn) {
        router.push('admin/login');
    } else if (!authStore.isAdmin) {
        router.push('unauthorized');
    }
});
</script>

<template>
    <div v-if="isAdmin" class="admin-container d-flex">
        <nav class="sidebar bg-dark text-white p-3" :class="{ collapsed: !menuOpen }">
            <ul class="nav flex-column">
                <h1 class="mb-4">Panel Admin</h1>
                <li class="nav-item" v-for="item in menuItems" :key="item.name">
                    <router-link :to="item.path">{{ item.name }}</router-link>
                </li>
            </ul>
            <button @click="menuOpen = !menuOpen" class="btn btn-sm btn-secondary mt-3">
                {{ menuOpen ? 'Cerrar' : 'Abrir' }}
            </button>
        </nav>

        <div class="content p-4 flex-grow-1">
            <router-view></router-view>
        </div>
    </div>
    <div v-else class="admin-container d-flex">
        cargando...
    </div>
</template>

<style scoped>
.admin-container {
    min-height: 100vh;
}

.sidebar {
    width: 220px;
    transition: width 0.3s;
}

.sidebar.collapsed {
    width: 60px;
}

.content {
    background: #f8f9fa;
}

.nav-link:hover {
    text-decoration: underline;
}
</style>
