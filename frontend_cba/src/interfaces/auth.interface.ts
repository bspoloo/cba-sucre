import type { Usuario } from "./usuario.interface";

export interface AuthResponse {
    user: Usuario;
    acccessToken: string;
    success: boolean;
}