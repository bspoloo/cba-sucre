import { Usuario } from "./usuario.interface";

export interface Auth {
    user: Usuario;
    acccessToken: string;
    success: boolean;
}