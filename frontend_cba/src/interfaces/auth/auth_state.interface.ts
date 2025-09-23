import type { Usuario } from "../usuario/usuario.interface";

export interface AuthState {
    user: Usuario,
    accessToken: string,
    refreshToken: string,
    returnUrl: string
}