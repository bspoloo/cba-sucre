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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuariosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const usuario_entity_1 = require("./entities/usuario.entity");
const typeorm_2 = require("typeorm");
let UsuariosService = class UsuariosService {
    constructor(usuariosRepository) {
        this.usuariosRepository = usuariosRepository;
    }
    async create(createUsuarioDto) {
        try {
            // Verificar si el usuario ya existe
            const existe = await this.usuariosRepository.findOneBy({
                name: createUsuarioDto.name.trim(),
            });
            if (existe) {
                throw new common_1.ConflictException('El usuario ya existe');
            }
            // Crear el nuevo usuario
            const usuario = this.usuariosRepository.create({
                name: createUsuarioDto.name.trim(),
                clave: process.env.DEFAULT_PASSWORD || 'default_password',
                email: createUsuarioDto.email.trim(),
                rol: createUsuarioDto.rol.trim(),
            });
            // Guardar el usuario en la base de datos
            const usuarioBd = await this.usuariosRepository.save(usuario);
            // Eliminar la clave antes de devolver el objeto
            usuarioBd.clave = ''; // O también puedes usar '' si prefieres una cadena vacía
            return usuarioBd;
        }
        catch (error) {
            console.error('Error al crear el usuario:', error);
            throw new common_1.InternalServerErrorException('Error al crear el usuario');
        }
    }
    async findAll() {
        return this.usuariosRepository.find();
    }
    async findOne(id) {
        const usuario = await this.usuariosRepository.findOneBy({ id });
        if (!usuario) {
            throw new common_1.NotFoundException(`El usuario ${id} no existe`);
        }
        return usuario;
    }
    async update(id, updateUsuarioDto) {
        const usuario = await this.findOne(id);
        const usuarioUpdate = Object.assign(usuario, updateUsuarioDto);
        return this.usuariosRepository.save(usuarioUpdate);
    }
    async remove(id) {
        const usuario = await this.findOne(id);
        return this.usuariosRepository.delete(usuario.id);
    }
    async validate(name, clave) {
        const user = await this.usuariosRepository.findOne({
            where: { name: name },
        });
        if (!user)
            throw new common_1.NotFoundException('Usuario inexistente');
        const isPasswordValid = await user.validatePassword(clave);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Clave incorrecta');
        }
        user.clave = ''; // O '' si prefieres una cadena vacía
        return user;
    }
};
exports.UsuariosService = UsuariosService;
exports.UsuariosService = UsuariosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(usuario_entity_1.Usuario)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsuariosService);
