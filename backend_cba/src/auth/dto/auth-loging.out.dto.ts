import { Usuario } from "@/usuarios/entities/usuario.entity";

export class AuthLoginOutDto {
    user!: Usuario;
    acccessToken!: string;
    success!: boolean;
}