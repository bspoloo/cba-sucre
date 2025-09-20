import { Usuario } from "@/usuarios/entities/usuario.entity";

export interface Session {
    acccessToken: string;
    refreshToken?: string;
    user: Usuario;
}