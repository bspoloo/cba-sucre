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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuariosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const usuario_entity_1 = require("./entities/usuario.entity");
const typeorm_2 = require("typeorm");
const roles_service_1 = require("../roles/roles.service");
const docente_entity_1 = require("../docentes/entities/docente.entity");
let UsuariosService = class UsuariosService {
    constructor(usuariosRepository, docentesRepository, rolesService) {
        this.usuariosRepository = usuariosRepository;
        this.docentesRepository = docentesRepository;
        this.rolesService = rolesService;
    }
    async create(createUsuarioDto) {
        try {
            const exists = await this.usuariosRepository.findOneBy({
                name: createUsuarioDto.name.trim(),
                deletedAt: (0, typeorm_2.IsNull)()
            });
            if (exists) {
                throw new common_1.ConflictException('El usuario ya existe');
            }
            const role = await this.rolesService.findByName(createUsuarioDto.role);
            const usuario = this.usuariosRepository.create({
                name: createUsuarioDto.name.trim(),
                password: process.env.DEFAULT_PASSWORD || 'default_password',
                email: createUsuarioDto.email.trim(),
                role: role,
            });
            const usuarioBd = await this.usuariosRepository.save(usuario);
            usuarioBd.password = '';
            return usuarioBd;
        }
        catch (error) {
            console.error('Error al crear el usuario:', error);
            throw new common_1.InternalServerErrorException('Error al crear el usuario');
        }
    }
    async findAll() {
        const users = this.usuariosRepository.find({
            where: {
                deletedAt: (0, typeorm_2.IsNull)()
            },
            relations: ['role', 'docente']
        });
        return users;
    }
    async findAllWithoutRelations() {
        const users = await this.usuariosRepository.find({
            where: {
                deletedAt: (0, typeorm_2.IsNull)()
            },
            relations: ['role', 'docente']
        });
        console.log(users);
        return users.filter((user) => !user.docente);
    }
    async findOne(id) {
        const user = await this.usuariosRepository.findOne({
            where: {
                id: id,
                deletedAt: (0, typeorm_2.IsNull)()
            },
            relations: ['role']
        });
        if (!user) {
            throw new common_1.NotFoundException(`El usuario ${id} no existe`);
        }
        return user;
    }
    async update(updateUsuarioDto) {
        const usuario = await this.findOne(updateUsuarioDto.id);
        const docente = updateUsuarioDto.docenteId
            ? await this.docentesRepository.findOne({
                where: { id: updateUsuarioDto.docenteId, deletedAt: (0, typeorm_2.IsNull)() },
            })
            : null;
        usuario.name = updateUsuarioDto.name;
        usuario.email = updateUsuarioDto.email;
        usuario.docente = docente;
        const { password } = usuario, usuarioSinPassword = __rest(usuario, ["password"]);
        await this.usuariosRepository.update(usuario.id, usuarioSinPassword);
        return this.findOne(usuario.id);
    }
    async remove(id) {
        const usuario = await this.findOne(id);
        const usuarioUpdate = Object.assign(usuario, { deletedAt: new Date() });
        return this.usuariosRepository.save(usuarioUpdate);
    }
    async validate(name, password) {
        const user = await this.usuariosRepository.findOne({
            where: {
                name: name,
                deletedAt: (0, typeorm_2.IsNull)(),
            },
            relations: ['role']
        });
        if (!user)
            throw new common_1.NotFoundException('Usuario inexistente');
        const isPasswordValid = await user.validatePassword(password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Credenciales incorrectas');
        }
        user.password = '';
        return user;
    }
};
exports.UsuariosService = UsuariosService;
exports.UsuariosService = UsuariosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(usuario_entity_1.Usuario)),
    __param(1, (0, typeorm_1.InjectRepository)(docente_entity_1.Docente)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        roles_service_1.RolesService])
], UsuariosService);
