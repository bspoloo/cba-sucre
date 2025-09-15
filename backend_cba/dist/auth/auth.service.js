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
        const { usuario, clave } = authLoginDto;
        const usuarioOk = await this.usuarioService.validate(usuario, clave);
        const payload = { sub: usuarioOk.id };
        const access_token = await this.getAccessToken(payload);
        return { user: usuarioOk, acccessToken: access_token, success: true };
    }
    async getAccessToken(payload) {
        const accessToken = await this.jwtService.sign(payload, {
            secret: process.env.JWT_SECRET || 'default_secret',
            expiresIn: process.env.JWT_TOKEN_EXPIRATION,
        });
        return accessToken;
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
