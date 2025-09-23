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
exports.ExperienciasController = void 0;
const common_1 = require("@nestjs/common");
const experiencias_service_1 = require("./experiencias.service");
const create_experiencia_dto_1 = require("./dto/create-experiencia.dto");
const update_experiencia_dto_1 = require("./dto/update-experiencia.dto");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let ExperienciasController = class ExperienciasController {
    constructor(experienciasService) {
        this.experienciasService = experienciasService;
    }
    async create(createExperienciaDto) {
        try {
            return this.experienciasService.create(createExperienciaDto);
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
            return this.experienciasService.findAll();
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
            return this.experienciasService.findOne(id);
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
    async update(updateExperienciaDto) {
        try {
            return this.experienciasService.update(updateExperienciaDto);
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
            return this.experienciasService.remove(id);
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
exports.ExperienciasController = ExperienciasController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_experiencia_dto_1.CreateExperienciaDto]),
    __metadata("design:returntype", Promise)
], ExperienciasController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ExperienciasController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ExperienciasController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_experiencia_dto_1.UpdateExperienciaDto]),
    __metadata("design:returntype", Promise)
], ExperienciasController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ExperienciasController.prototype, "remove", null);
exports.ExperienciasController = ExperienciasController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiTags)('experiencias'),
    (0, common_1.Controller)('experiencias'),
    __metadata("design:paramtypes", [experiencias_service_1.ExperienciasService])
], ExperienciasController);
