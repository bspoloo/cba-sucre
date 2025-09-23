import type { Usuario } from "../usuario/usuario.interface";

export interface AuthResponse {
    user: Usuario;
    acccessToken: string;
    success: boolean;
}