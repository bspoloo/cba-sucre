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
exports.EstudiantesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const estudiante_entity_1 = require("./entities/estudiante.entity");
let EstudiantesService = class EstudiantesService {
    constructor(estudianteRepository) {
        this.estudianteRepository = estudianteRepository;
    }
    // Crear estudiante
    async create(createEstudianteDto) {
        const estudiante = this.estudianteRepository.create(createEstudianteDto);
        return await this.estudianteRepository.save(estudiante);
    }
    // Listar todos los estudiantes
    async findAll() {
        return await this.estudianteRepository.find();
    }
    // Buscar un estudiante por id
    async findOne(id) {
        const estudiante = await this.estudianteRepository.findOne({ where: { id } });
        if (!estudiante)
            throw new common_1.NotFoundException(`Estudiante con ID ${id} no encontrado`);
        return estudiante;
    }
    // Actualizar estudiante
    async update(id, updateEstudianteDto) {
        const estudiante = await this.findOne(id);
        Object.assign(estudiante, updateEstudianteDto);
        return await this.estudianteRepository.save(estudiante);
    }
    // Eliminar estudiante
    async remove(id) {
        const result = await this.estudianteRepository.delete(id);
        if (result.affected === 0)
            throw new common_1.NotFoundException(`Estudiante con ID ${id} no encontrado`);
    }
};
exports.EstudiantesService = EstudiantesService;
exports.EstudiantesService = EstudiantesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(estudiante_entity_1.Estudiante)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], EstudiantesService);
