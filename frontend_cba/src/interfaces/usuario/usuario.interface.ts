import type { Docente } from "../docente/docente.interface";
import type { Role } from "../role/roles.interface";

export interface Usuario {
    id: number;
    name: string;
    password: string;
    email: string;
    role: Role;
    docente: Docente;
}