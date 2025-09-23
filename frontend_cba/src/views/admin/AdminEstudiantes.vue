<script setup lang="ts">
import { ref, onMounted } from 'vue'
import api from '@/plugins/axios'
import type { Estudiante } from '@/interfaces/estudiante/estudiante.interface'
import { useConfirm, useToast } from 'primevue'
import { EstudianteService } from '@/services/estudiantes_service'

const estudiantes = ref<Estudiante[]>([])
const nuevoEstudiante = ref<Partial<Estudiante>>({})
const toast = useToast();
const confirmModal = useConfirm();
const estudiantesService = new EstudianteService();

const agregarEstudiante = async () => {
  if (!nuevoEstudiante.value.ci || !nuevoEstudiante.value.nombres) {
    toast.add({
      severity: 'warn',
      summary: 'Advertencia',
      detail: 'CI y Nombres son obligatorios',
      life: 3000
    });
    return
  }
  try {
    const { data } = await api.post(`${import.meta.env.VITE_BASE_URL_API}/estudiantes`, nuevoEstudiante.value,)
    estudiantes.value.push(data)
    nuevoEstudiante.value = {}
    toast.add({
      severity: 'success',
      summary: 'Éxito',
      detail: `Estudiante agregado correctamente ${data.nombres}`,
      life: 3000
    });
  } catch (error) {
    console.log(error);
    const response = JSON.parse((error as any)?.request?.responseText);
    response.message.forEach((message: string) => {
      toast.add({
        severity: 'warn',
        summary: 'Error',
        detail: `${message ?? 'Error desconocido'}`,
        life: 3000
      });
    });
  }
}

const eliminarEstudiante = async (id: string) => {
  // if (!confirm('¿Estás seguro de eliminar este estudiante?')) return
  try {
    const response = await api.delete(`/estudiantes/${id}`);
    const estudiante: Estudiante = response.data;

    toast.add({
      severity: 'success',
      summary: 'Éxito',
      detail: `Estudiante eliminado correctamente ${estudiante.nombres}`,
      life: 3000
    });

  } catch (error) {
    console.error(error)
    const response = JSON.parse((error as any)?.request?.responseText);
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: `Error al eliminar el estudiante ${response.message ?? 'Error desconocido'}`,
      life: 3000
    });
    return [];
  }
}

const confirmInsert = () => {
  confirmModal.require({
    message: 'Estas seguro de insertar este estudiante?',
    header: 'Confirmacion',
    icon: 'pi pi-exclamation-triangle',
    rejectProps: {
      label: 'Cancel',
      severity: 'secondary',
      outlined: true
    },
    acceptProps: {
      label: 'Guardar'
    },
    accept: async () => {
      await agregarEstudiante();
      estudiantes.value = await estudiantesService.getEstudiantes()
    },
    reject: () => {
      toast.add({ severity: 'error', summary: 'Rechazado', detail: 'Opcion cancelada', life: 3000 });
    }
  });
}

const confirmDelete = (id: string) => {
  confirmModal.require({
    message: 'quieres borrar este estudiante?',
    header: 'Danger Zone',
    icon: 'pi pi-info-circle',
    rejectLabel: 'Cancelar',
    rejectProps: {
      label: 'Cancelar',
      severity: 'secondary',
      outlined: true
    },
    acceptProps: {
      label: 'Borrar',
      severity: 'danger'
    },
    accept: async () => {
      await eliminarEstudiante(id);
      estudiantes.value = await estudiantesService.getEstudiantes()
    },
    reject: () => {
      toast.add({ severity: 'error', summary: 'Rejected', detail: 'Accion cancelada', life: 3000 });
    }
  });
}
onMounted(async () => {
  estudiantes.value = await estudiantesService.getEstudiantes()
})
</script>

<template>
  <Toast />
  <ConfirmDialog></ConfirmDialog>
  <div class="container py-4">
    <h1 class="mb-4">Administrar Estudiantes</h1>

    <!-- Formulario Crear -->
    <div class="mb-4 row g-2">
      <div class="col-md-2">
        <input v-model="nuevoEstudiante.ci" type="number" placeholder="CI" class="form-control" />
      </div>
      <div class="col-md-3">
        <input v-model="nuevoEstudiante.nombres" placeholder="Nombres" class="form-control" />
      </div>
      <div class="col-md-3">
        <input v-model="nuevoEstudiante.apellidos" placeholder="Apellidos" class="form-control" />
      </div>
      <div class="col-md-3">
        <input v-model="nuevoEstudiante.telefono" placeholder="Teléfono" class="form-control" />
      </div>
      <div class="col-md-1">
        <button @click="confirmInsert" class="btn btn-primary w-100">Agregar</button>
      </div>
    </div>

    <!-- Tabla de Estudiantes -->
    <table class="table table-striped table-bordered">
      <thead class="table-dark">
        <tr>
          <th>CI</th>
          <th>Nombres</th>
          <th>Apellidos</th>
          <th>Teléfono</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="est in estudiantes" :key="est.id">
          <td>{{ est.ci }}</td>
          <td>{{ est.nombres }}</td>
          <td>{{ est.apellidos }}</td>
          <td>{{ est.telefono }}</td>
          <td>
            <button @click="confirmDelete(est.id)" class="btn btn-danger btn-sm">
              Eliminar
            </button>
          </td>
        </tr>
        <tr v-if="estudiantes.length === 0">
          <td colspan="5" class="text-center">No hay estudiantes registrados</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
/* Opcional: puedes agregar estilos propios */
</style>
