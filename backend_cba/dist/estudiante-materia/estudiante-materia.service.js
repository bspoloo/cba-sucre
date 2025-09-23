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
exports.EstudianteMateriaService = void 0;
const common_1 = require("@nestjs/common");
const estudiante_materia_entity_1 = require("./entities/estudiante-materia.entity");
const estudiantes_service_1 = require("../estudiantes/estudiantes.service");
const materias_service_1 = require("../materias/materias.service");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let EstudianteMateriaService = class EstudianteMateriaService {
    constructor(estudianteMateriaRepository, estudiantesService, materiasService) {
        this.estudianteMateriaRepository = estudianteMateriaRepository;
        this.estudiantesService = estudiantesService;
        this.materiasService = materiasService;
    }
    async create(createEstudianteMateriaDto) {
        const estudiante = this.estudiantesService.findOne(createEstudianteMateriaDto.materia_id);
        const materia = this.materiasService.findOne(createEstudianteMateriaDto.estudiante_id);
        const estudianteMateria = this.estudianteMateriaRepository.create(Object.assign(Object.assign({}, createEstudianteMateriaDto), { estudiante: await estudiante, materia: await materia }));
        return estudianteMateria;
    }
    async findAll() {
        const materias = await this.estudianteMateriaRepository.find({ relations: ['estudiante', 'materia'] });
        return materias;
    }
    async findOne(id) {
        const materia = await this.estudianteMateriaRepository.findOne({
            where: { id }, relations: ['estudiante', 'materia']
        });
        if (!materia) {
            throw new Error(`Materia con ID ${id} no encontrada`);
        }
        return materia;
    }
    async update(updateEstudianteMateriaDto) {
        const estudianteMateria = await this.findOne(updateEstudianteMateriaDto.id);
        if (!estudianteMateria) {
            throw new Error(`Estudiante Materia con ID ${updateEstudianteMateriaDto.id} no encontrada`);
        }
        Object.assign(estudianteMateria, updateEstudianteMateriaDto);
        return this.estudianteMateriaRepository.save(estudianteMateria);
    }
    async remove(id) {
        const estudianteMateria = await this.findOne(id);
        if (!estudianteMateria) {
            throw new Error(`Materia con ID ${id} no encontrada`);
        }
        Object.assign(estudianteMateria, { deleted_at: new Date() });
        return this.estudianteMateriaRepository.save(estudianteMateria);
    }
};
exports.EstudianteMateriaService = EstudianteMateriaService;
exports.EstudianteMateriaService = EstudianteMateriaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(estudiante_materia_entity_1.EstudianteMateria)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        estudiantes_service_1.EstudiantesService,
        materias_service_1.MateriasService])
], EstudianteMateriaService);
