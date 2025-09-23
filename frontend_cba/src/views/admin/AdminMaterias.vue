<script setup lang="ts">
import { ref, onMounted } from 'vue'
import api from '@/plugins/axios'
import type { Materia } from '@/interfaces/materia/materia.interface'
import type { CreateMateriaDto } from '@/interfaces/materia/create_materia.dto.interface'
import { useConfirm, useToast } from 'primevue'
import { MateriaService } from '@/services/materias_service'

const materias = ref<Materia[]>([])
const nuevaMateria = ref<Partial<CreateMateriaDto>>({});
const confirmModal = useConfirm();
const toast = useToast();
const materiasService = new MateriaService();

const agregarMateria = async () => {
  try {
    const { data } = await api.post('/materias', nuevaMateria.value)
    // materias.value.push(data)
    nuevaMateria.value = {}

    toast.add({
      severity: 'success',
      summary: 'Éxito',
      detail: `Materia agregada correctamente ${data.nombre}`,
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

const eliminarMateria = async (materia: Materia) => {
  try {
    await api.delete(`/materias/${materia.id}`)
    toast.add({
      severity: 'success',
      summary: 'Éxito',
      detail: `Materia eliminada correctamente ${materia.nombre}`,
      life: 3000
    });
  } catch (error) {
    console.error(error)
    const response = JSON.parse((error as any)?.request?.responseText);
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: `Error al eliminar materia ${response.message ?? 'Error desconocido'}`,
      life: 3000
    });
  }
}

const confirmInsert = () => {
  confirmModal.require({
    message: 'Estas seguro de insertar esta materia?',
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
      await agregarMateria();
      materias.value = await materiasService.getMaterias();
    },
    reject: () => {
      toast.add({ severity: 'error', summary: 'Rechazado', detail: 'Opcion cancelada', life: 3000 });
    }
  });
}

const confirmDelete = (materia: Materia) => {
  confirmModal.require({
    message: 'quieres borrar este materia?',
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
      await eliminarMateria(materia);
      materias.value = await materiasService.getMaterias();
    },
    reject: () => {
      toast.add({ severity: 'error', summary: 'Rejected', detail: 'Accion cancelada', life: 3000 });
    }
  });
}

onMounted(async () => {
  materias.value = await materiasService.getMaterias();
})
</script>

<template>
  <Toast />
  <ConfirmDialog></ConfirmDialog>
  <div class="container py-4">
    <h2>Administrar Materias</h2>

    <div class="mb-4">
      <input v-model="nuevaMateria.nombre" placeholder="Nombre" class="form-control mb-2" />
      <input v-model="nuevaMateria.aula" placeholder="Aula" class="form-control mb-2" />
      <input v-model="nuevaMateria.hora" type="number" min="8" max="19" placeholder="Hora" class="form-control mb-2" />
      <input v-model="nuevaMateria.codigo" placeholder="Código" class="form-control mb-2" />
      <button @click="confirmInsert" class="btn btn-primary">Agregar</button>
    </div>

    <table class="table table-striped">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Aula</th>
          <th>Código</th>
          <th>Hora</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="m in materias" :key="m.id">
          <td>{{ m.nombre }}</td>
          <td>{{ m.aula }}</td>
          <td>{{ m.codigo }}</td>
          <td>{{ m.hora }}</td>
          <td>
            <button @click="confirmDelete(m)" class="btn btn-danger btn-sm">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
