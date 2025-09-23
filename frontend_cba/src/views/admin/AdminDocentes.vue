<script setup lang="ts">
import { ref, onMounted } from 'vue'
import api from '@/plugins/axios'
import type { Docente } from '@/interfaces/docente/docente.interface'
import { useToast } from 'primevue/usetoast'
import { UserService } from '@/services/user_service'
import { MateriaService } from '@/services/materias_service'
import type { Materia } from '@/interfaces/materia/materia.interface'
import type { CreateDocenteDto } from '@/interfaces/docente/create_docente.dto.interface'
import type { Usuario } from '@/interfaces/usuario/usuario.interface'
import { useConfirm } from 'primevue'
import { DocenteService } from '@/services/docentes_service'

const docentes = ref<Docente[]>([]);
const nuevoDocente = ref<Partial<CreateDocenteDto>>({});
const toast = useToast();
const user_service = new UserService();
const materias_service = new MateriaService();
const usuarios = ref<Usuario[]>([]);
const materias = ref<Materia[]>([]);
const confirmModal = useConfirm();
const docenteService = new DocenteService();

const agregarDocente = async () => {
  try {
    const { data } = await api.post('/docentes', nuevoDocente.value)
    docentes.value.push(data)
    nuevoDocente.value = {}
  } catch (error) {
    console.log(error);
    const response = JSON.parse((error as any)?.request?.responseText);

    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: `${error ?? 'Error desconocido'}`,
      life: 3000
    });

    response.message.forEach((message: string) => {
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: `${message ?? 'Error desconocido'}`,
        life: 3000
      });
    });
  }
}

const eliminarDocente = async (id: string) => {
  try {
    await api.delete(`/docentes/${id}`)
    // docentes.value = docentes.value.filter(d => d.id !== id)
  } catch (error) {
    console.error(error)
  }
}

const confirmInsert = () => {
  confirmModal.require({
    message: 'Estas seguro de insertar este docente?',
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
      await agregarDocente();
      docentes.value = await docenteService.getDocentes();
    },
    reject: () => {
      toast.add({ severity: 'error', summary: 'Rechazado', detail: 'Opcion cancelada', life: 3000 });
    }
  });
}

const confirmDelete = (id: string) => {
  confirmModal.require({
    message: 'quieres borrar este docente?',
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
      await eliminarDocente(id);
      docentes.value = await docenteService.getDocentes();

    },
    reject: () => {
      toast.add({ severity: 'error', summary: 'Rejected', detail: 'Accion cancelada', life: 3000 });
    }
  });
}


// onMounted(cargarDocentes)
onMounted(async () => {
  docentes.value = await docenteService.getDocentes();
  usuarios.value = await user_service.getUsersNoRelations();
  materias.value = await materias_service.getMaterias();
});
</script>

<template>
  <Toast />
  <ConfirmDialog></ConfirmDialog>
  <div class="container py-4">
    <h2>Administrar Docentes</h2>
    <div class="mb-4">
      <input v-model="nuevoDocente.ci" type="number" min="0" placeholder="CI" class="form-control mb-2" />
      <input v-model="nuevoDocente.nombres" placeholder="Nombres" class="form-control mb-2" />
      <input v-model="nuevoDocente.apellidos" placeholder="Apellidos" class="form-control mb-2" />
      <input v-model="nuevoDocente.telefono" type="number" min="0" placeholder="Teléfono" class="form-control mb-2" />
      <input v-model="nuevoDocente.direccion" placeholder="Direccion" class="form-control mb-2" />

      <label for="users">Usuario</label>
      <select v-model="nuevoDocente.usuario_id" name="users" id="users" class="form-control mb-2">
        <option disabled value="">Seleccionar usuario</option>
        <option v-for="usuario in usuarios" :key="usuario.id" :value="usuario.id">
          {{ usuario.name }}
        </option>
      </select>

      <label for="materias">Materia</label>
      <select v-model="nuevoDocente.materia_id" name="materias" id="materias" class="form-control mb-2">
        <option disabled value="">Seleccionar materia</option>
        <option v-for="materia in materias" :key="materia.id" :value="materia.id">
          {{ materia.nombre }}
        </option>
      </select>

      <button @click="confirmInsert" class="btn btn-primary">Agregar</button>
    </div>

    <table class="table table-striped">
      <thead>
        <tr>
          <th>CI</th>
          <th>Nombres</th>
          <th>Apellidos</th>
          <th>Teléfono</th>
          <th>Materia</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="d in docentes" :key="d.id">
          <td>{{ d.ci }}</td>
          <td>{{ d.nombres }}</td>
          <td>{{ d.apellidos }}</td>
          <td>{{ d.telefono }}</td>
          <td>{{ d.materia?.nombre }}</td>
          <td>
            <button @click="confirmDelete(d.id)" class="btn btn-danger btn-sm">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
