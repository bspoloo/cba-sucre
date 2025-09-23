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
exports.ExperienciasService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const experiencia_entity_1 = require("./entities/experiencia.entity");
const typeorm_2 = require("typeorm");
let ExperienciasService = class ExperienciasService {
    constructor(experienciasRepository) {
        this.experienciasRepository = experienciasRepository;
    }
    async create(createExperienciaDto) {
        const experiencia = this.experienciasRepository.create(createExperienciaDto);
        return this.experienciasRepository.save(experiencia);
    }
    async findAll() {
        const experiencias = this.experienciasRepository.find({
            where: {
                deletedAt: (0, typeorm_2.IsNull)()
            }
        });
        return experiencias;
    }
    async findOne(id) {
        const experiencia = await this.experienciasRepository.findOne({
            where: {
                deletedAt: (0, typeorm_2.IsNull)()
            }
        });
        if (!experiencia)
            throw new common_1.NotFoundException(`Experiencia con ID ${id} no encontrado`);
        return experiencia;
    }
    async update(updateExperienciaDto) {
        const experiencia = await this.findOne(updateExperienciaDto.id);
        Object.assign(experiencia, updateExperienciaDto);
        return this.experienciasRepository.save(updateExperienciaDto);
    }
    async remove(id) {
        const experiencia = await this.findOne(id);
        Object.assign(experiencia, { deletedAt: new Date() });
        return this.experienciasRepository.save(experiencia);
    }
};
exports.ExperienciasService = ExperienciasService;
exports.ExperienciasService = ExperienciasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(experiencia_entity_1.Experiencia)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ExperienciasService);
