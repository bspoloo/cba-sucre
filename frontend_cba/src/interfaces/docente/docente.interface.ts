import type { Materia } from "../materia/materia.interface"
import type { Usuario } from "../usuario/usuario.interface"

export interface Docente {
    id: string;
    ci: number;
    nombres: string;
    apellidos: string;
    telefono: string;
    direccion: string;
    materia?: Materia;
    usuario?: Usuario;
}