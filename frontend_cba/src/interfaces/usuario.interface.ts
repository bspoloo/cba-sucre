import type { Docente } from "./docente.interface";

export interface Usuario {
    id: number;
    name: string;
    clave: string; // Cambiado a opcional
    email: string;
    rol: string;
    docente: Docente;
}