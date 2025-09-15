import { Docente } from "./docente.interface";

export interface Materia {
    id: number
    nombre: string
    codigo: string
    docente?: string
}