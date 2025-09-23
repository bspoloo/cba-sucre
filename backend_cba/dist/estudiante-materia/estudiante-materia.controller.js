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
exports.EstudianteMateriaController = void 0;
const common_1 = require("@nestjs/common");
const estudiante_materia_service_1 = require("./estudiante-materia.service");
const create_estudiante_materia_dto_1 = require("./dto/create-estudiante-materia.dto");
const update_estudiante_materia_dto_1 = require("./dto/update-estudiante-materia.dto");
let EstudianteMateriaController = class EstudianteMateriaController {
    constructor(estudianteMateriaService) {
        this.estudianteMateriaService = estudianteMateriaService;
    }
    async create(createEstudianteMateriaDto) {
        try {
            return this.estudianteMateriaService.create(createEstudianteMateriaDto);
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error al crear la materia: ${error.message}`);
            }
            throw new Error('Error al crear la materia: error desconocido');
        }
    }
    async findAll() {
        try {
            return this.estudianteMateriaService.findAll();
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error al traer materias: ${error.message}`);
            }
            throw new Error('Error al traer materias: error desconocido');
        }
    }
    async findOne(id) {
        try {
            return this.estudianteMateriaService.findOne(+id);
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error al buscar la materia: ${error.message}`);
            }
            throw new Error('Error al buscar la materia: error desconocido');
        }
    }
    async update(id, updateEstudianteMateriaDto) {
        try {
            return this.estudianteMateriaService.update(updateEstudianteMateriaDto);
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error al actualizar la materia: ${error.message}`);
            }
            throw new Error('Error al actualizar la materia: error desconocido');
        }
    }
    async remove(id) {
        try {
            return this.estudianteMateriaService.remove(+id);
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error al borrar la materia: ${error.message}`);
            }
            throw new Error('Error al borrar la materia: error desconocido');
        }
    }
};
exports.EstudianteMateriaController = EstudianteMateriaController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_estudiante_materia_dto_1.CreateEstudianteMateriaDto]),
    __metadata("design:returntype", Promise)
], EstudianteMateriaController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EstudianteMateriaController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EstudianteMateriaController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_estudiante_materia_dto_1.UpdateEstudianteMateriaDto]),
    __metadata("design:returntype", Promise)
], EstudianteMateriaController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EstudianteMateriaController.prototype, "remove", null);
exports.EstudianteMateriaController = EstudianteMateriaController = __decorate([
    (0, common_1.Controller)('estudiante-materia'),
    __metadata("design:paramtypes", [estudiante_materia_service_1.EstudianteMateriaService])
], EstudianteMateriaController);
