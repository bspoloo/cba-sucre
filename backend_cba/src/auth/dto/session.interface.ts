import { Usuario } from "@/usuarios/entities/usuario.entity";

export interface Session {
    accessToken: string;
    refreshToken?: string;
    user: Usuario;
}