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
exports.MateriasService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const materia_entity_1 = require("./entities/materia.entity");
let MateriasService = class MateriasService {
    constructor(materiaRepository) {
        this.materiaRepository = materiaRepository;
    }
    async create(createMateriaDto) {
        const materia = await this.materiaRepository.findOne({
            where: {
                nombre: createMateriaDto.nombre.trim(),
                deletedAt: (0, typeorm_2.IsNull)(),
            }
        });
        if (materia)
            throw new Error('Materia ya existe con ese nombre');
        return await this.materiaRepository.save(createMateriaDto);
    }
    async findAll() {
        const materias = this.materiaRepository.find({
            where: {
                deletedAt: (0, typeorm_2.IsNull)()
            }
        });
        return materias;
    }
    async findOne(id) {
        const materia = await this.materiaRepository.findOne({
            where: {
                id: id,
                deletedAt: (0, typeorm_2.IsNull)()
            }
        });
        if (!materia)
            throw new common_1.NotFoundException(`Materia con ID ${id} no encontrado`);
        return materia;
    }
    async update(updateMateriaDto) {
        const materia = await this.findOne(updateMateriaDto.id);
        Object.assign(materia, updateMateriaDto);
        return await this.materiaRepository.save(materia);
    }
    async remove(id) {
        const materia = await this.findOne(id);
        Object.assign(materia, { deletedAt: new Date() });
        return this.materiaRepository.save(materia);
    }
};
exports.MateriasService = MateriasService;
exports.MateriasService = MateriasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(materia_entity_1.Materia)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MateriasService);
