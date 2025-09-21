import type { Docente } from "./docente.interface";
import type { Role } from "./roles.interface";

export interface Usuario {
    id: number;
    name: string;
    password: string;
    email: string;
    role: Role;
    docente: Docente;
}