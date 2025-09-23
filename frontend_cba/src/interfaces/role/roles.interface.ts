import type { Usuario } from "../usuario/usuario.interface";

export interface Role {
    id: string;
    name: string;
    description: string;
    // users: Usuario[];
}