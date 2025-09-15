import type { Docente } from "./docente.interface";

export interface Usuario {
    id: number;
    usuario: string;
    clave: string; // Cambiado a opcional
    email: string;
    tipoUsuario: string;
    docente: Docente;
}