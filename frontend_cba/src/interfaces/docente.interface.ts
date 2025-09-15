import { Materia } from "./materia.interface";
import { Usuario } from "./usuario.interface";

export interface Docente {
    id: number
    ci: number
    nombres: string
    apellidos: string
    telefono: string
    materia?: string
}