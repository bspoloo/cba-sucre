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
exports.DocentesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const docente_entity_1 = require("./entities/docente.entity");
const usuarios_service_1 = require("../usuarios/usuarios.service");
const materias_service_1 = require("../materias/materias.service");
let DocentesService = class DocentesService {
    constructor(docenteRepository, userService, materiaService) {
        this.docenteRepository = docenteRepository;
        this.userService = userService;
        this.materiaService = materiaService;
    }
    async create(createDocenteDto) {
        var _a;
        const docenteExistente = await this.docenteRepository.findOne({
            where: {
                nombres: createDocenteDto.nombres.trim(),
                deletedAt: (0, typeorm_2.IsNull)(),
            }
        });
        if (docenteExistente) {
            throw new Error('Docente ya existe con ese nombre');
        }
        const usuario = await this.userService.findOne(createDocenteDto.usuario_id);
        const materia = await this.materiaService.findOne(createDocenteDto.materia_id);
        const docente = this.docenteRepository.create(Object.assign(Object.assign({}, createDocenteDto), { materia,
            usuario }));
        const docenteSaved = await this.docenteRepository.save(docente);
        const usuarioUpdated = await this.userService.update({
            id: usuario.id,
            docenteId: docenteSaved.id,
            role: (_a = usuario.role) === null || _a === void 0 ? void 0 : _a.name,
        });
        docenteSaved.usuario = usuarioUpdated;
        return await this.docenteRepository.save(docenteSaved);
    }
    async findAll() {
        const docentes = this.docenteRepository.find({
            where: {
                deletedAt: (0, typeorm_2.IsNull)()
            },
            relations: ['usuario', 'materia']
        });
        return docentes;
    }
    async findOne(id) {
        const docente = await this.docenteRepository.findOne({
            where: {
                id: id,
                deletedAt: (0, typeorm_2.IsNull)()
            }
        });
        if (!docente)
            throw new common_1.NotFoundException(`Docente con ID ${id} no encontrado`);
        return docente;
    }
    async update(updateDocenteDto) {
        const docente = await this.findOne(updateDocenteDto.id);
        Object.assign(docente, updateDocenteDto);
        return this.docenteRepository.save(docente);
    }
    async remove(id) {
        const docente = await this.findOne(id);
        Object.assign(docente, { deletedAt: new Date() });
        return this.docenteRepository.save(docente);
    }
};
exports.DocentesService = DocentesService;
exports.DocentesService = DocentesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(docente_entity_1.Docente)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        usuarios_service_1.UsuariosService,
        materias_service_1.MateriasService])
], DocentesService);
