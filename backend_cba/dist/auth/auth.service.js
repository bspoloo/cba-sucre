"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const usuarios_service_1 = require("../usuarios/usuarios.service");
let AuthService = class AuthService {
    constructor(usuarioService, jwtService) {
        this.usuarioService = usuarioService;
        this.jwtService = jwtService;
    }
    async login(authLoginDto) {
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
    async getAccessToken(payload) {
        const accessToken = await this.jwtService.sign(payload, {
            secret: process.env.JWT_SECRET || 'default_access_token_secret',
            expiresIn: process.env.JWT_TOKEN_EXPIRATION,
        });
        return accessToken;
    }
    async getRefreshToken(payload) {
        const refreshToken = await this.jwtService.sign(payload, {
            secret: process.env.JWT_SECRET || 'default_refresh_secret',
            expiresIn: process.env.JWT_TOKEN_EXPIRATION,
        });
        return refreshToken;
    }
    async refreshTokens(oldRefresh) {
        try {
            const payload = this.jwtService.verify(oldRefresh, {
                secret: process.env.JWT_REFRESH_SECRET || 'refresh_default_secret',
            });
            const userId = payload.sub;
            const user = await this.usuarioService.findOne(userId);
            const accessToken = this.jwtService.sign({ sub: userId }, { secret: process.env.JWT_SECRET || 'default_secret', expiresIn: '15m' });
            const refreshToken = this.jwtService.sign({ sub: userId }, { secret: process.env.JWT_REFRESH_SECRET || 'refresh_default_secret', expiresIn: '7d' });
            return { accessToken, refreshToken, user };
        }
        catch (err) {
            throw new common_1.UnauthorizedException('Refresh token inválido o expirado');
        }
    }
    async verifyPayload(payload) {
        let usuario;
        try {
            usuario = await this.usuarioService.findOne(payload.sub);
        }
        catch (error) {
            throw new common_1.UnauthorizedException(`Usuario inválido: ${payload.sub}`);
        }
        return usuario;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [usuarios_service_1.UsuariosService,
        jwt_1.JwtService])
], AuthService);
