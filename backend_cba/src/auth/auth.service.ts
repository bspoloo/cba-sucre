import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from '../usuarios/usuarios.service';
import { Credentials } from './dto/credentials.class';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { Session } from './dto/session.interface';

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuariosService,
    private jwtService: JwtService,

  ) { }

  public async login(authLoginDto: Credentials): Promise<Session> {
    const { usuario: user_name, clave } = authLoginDto;
    const user = await this.usuarioService.validate(user_name, clave);

    const payload = { sub: user.id };
    const access_token = await this.getAccessToken(payload);
    const refresh_token = await this.getRefreshToken(payload);

    return {
      accessToken: access_token,
      refreshToken: refresh_token,
      user: user,
    };
  }

  private async getAccessToken(payload: JwtPayload): Promise<string> {
    const accessToken = await this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET || 'default_access_token_secret',
      expiresIn: process.env.JWT_TOKEN_EXPIRATION,
    });
    return accessToken;
  }

  private async getRefreshToken(payload: JwtPayload): Promise<string> {
    const refreshToken = await this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET || 'default_refresh_secret',
      expiresIn: process.env.JWT_TOKEN_EXPIRATION,
    });
    return refreshToken;
  }

  public async refreshTokens(oldRefresh: string): Promise<{ accessToken: string, refreshToken: string , user: Usuario}> {
    try {
      const payload = this.jwtService.verify(oldRefresh, {
        secret: process.env.JWT_REFRESH_SECRET || 'refresh_default_secret',
      });
      const userId = payload.sub;
      const user: Usuario = await this.usuarioService.findOne(userId);
      const accessToken = this.jwtService.sign(
        { sub: userId },
        { secret: process.env.JWT_SECRET || 'default_secret', expiresIn: '15m' },
      );

      const refreshToken = this.jwtService.sign(
        { sub: userId },
        { secret: process.env.JWT_REFRESH_SECRET || 'refresh_default_secret', expiresIn: '7d' },
      );

      return { accessToken, refreshToken, user };
    } catch (err) {
      throw new UnauthorizedException('Refresh token inválido o expirado');
    }
  }

  public async verifyPayload(payload: JwtPayload): Promise<Usuario> {
    let usuario: Usuario;

    try {
      usuario = await this.usuarioService.findOne(payload.sub);
    } catch (error) {
      throw new UnauthorizedException(`Usuario inválido: ${payload.sub}`);
    }
    return usuario;
  }
}
