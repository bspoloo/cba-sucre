import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from '../usuarios/usuarios.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { AuthLoginOutDto } from './dto/auth-loging.out.dto';

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuariosService,
    private jwtService: JwtService,
  ) { }

  async login(authLoginDto: AuthLoginDto): Promise<AuthLoginOutDto> {
    const { usuario, clave } = authLoginDto;
    const usuarioOk = await this.usuarioService.validate(usuario, clave);

    const payload = { sub: usuarioOk.id };
    const access_token = await this.getAccessToken(payload);

    return { user: usuarioOk, acccessToken: access_token, success: true };
  }

  async getAccessToken(payload: JwtPayload) {
    const accessToken = await this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET || 'default_secret',
      expiresIn: process.env.JWT_TOKEN_EXPIRATION,
    });
    return accessToken;
  }

  async verifyPayload(payload: JwtPayload): Promise<Usuario> {
    let usuario: Usuario;

    try {
      usuario = await this.usuarioService.findOne(payload.sub);
    } catch (error) {
      throw new UnauthorizedException(`Usuario inválido: ${payload.sub}`);
    }

    return usuario;
  }
}
