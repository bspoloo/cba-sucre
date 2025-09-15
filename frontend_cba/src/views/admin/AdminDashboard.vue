<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const menuOpen = ref(true)

// Opciones del menú lateral
const menuItems = [
  { name: 'Dashboard', path: '/admin' },
  { name: 'Estudiantes', path: '/admin/estudiantes' },
  { name: 'Docentes', path: '/admin/docentes' },
  { name: 'Materias', path: '/admin/materias' },
]
</script>

<template>
  <div class="admin-container d-flex">
    dashboard
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
