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
exports.MateriasController = void 0;
const common_1 = require("@nestjs/common");
const materias_service_1 = require("./materias.service");
const create_materia_dto_1 = require("./dto/create-materia.dto");
const update_materia_dto_1 = require("./dto/update-materia.dto");
let MateriasController = class MateriasController {
    constructor(materiasService) {
        this.materiasService = materiasService;
    }
    async create(createMateriaDto) {
        try {
            return this.materiasService.create(createMateriaDto);
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            else {
                throw new Error('An unknown error occurred');
            }
        }
    }
    async findAll() {
        try {
            return this.materiasService.findAll();
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            else {
                throw new Error('An unknown error occurred');
            }
        }
    }
    async findOne(id) {
        try {
            return this.materiasService.findOne(id);
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            else {
                throw new Error('An unknown error occurred');
            }
        }
    }
    async update(updateMateriaDto) {
        try {
            return this.materiasService.update(updateMateriaDto);
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            else {
                throw new Error('An unknown error occurred');
            }
        }
    }
    async remove(id) {
        try {
            return this.materiasService.remove(id);
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            else {
                throw new Error('An unknown error occurred');
            }
        }
    }
};
exports.MateriasController = MateriasController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_materia_dto_1.CreateMateriaDto]),
    __metadata("design:returntype", Promise)
], MateriasController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MateriasController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MateriasController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_materia_dto_1.UpdateMateriaDto]),
    __metadata("design:returntype", Promise)
], MateriasController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MateriasController.prototype, "remove", null);
exports.MateriasController = MateriasController = __decorate([
    (0, common_1.Controller)('materias'),
    __metadata("design:paramtypes", [materias_service_1.MateriasService])
], MateriasController);
