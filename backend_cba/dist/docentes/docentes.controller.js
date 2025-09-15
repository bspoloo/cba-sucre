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
exports.DocentesController = void 0;
const common_1 = require("@nestjs/common");
const docentes_service_1 = require("./docentes.service");
const create_docente_dto_1 = require("./dto/create-docente.dto");
const update_docente_dto_1 = require("./dto/update-docente.dto");
let DocentesController = class DocentesController {
    constructor(docentesService) {
        this.docentesService = docentesService;
    }
    create(createDocenteDto) {
        return this.docentesService.create(createDocenteDto);
    }
    findAll() {
        return this.docentesService.findAll();
    }
    findOne(id) {
        return this.docentesService.findOne(+id);
    }
    update(id, updateDocenteDto) {
        return this.docentesService.update(+id, updateDocenteDto);
    }
    remove(id) {
        return this.docentesService.remove(+id);
    }
};
exports.DocentesController = DocentesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_docente_dto_1.CreateDocenteDto]),
    __metadata("design:returntype", void 0)
], DocentesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DocentesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DocentesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_docente_dto_1.UpdateDocenteDto]),
    __metadata("design:returntype", void 0)
], DocentesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DocentesController.prototype, "remove", null);
exports.DocentesController = DocentesController = __decorate([
    (0, common_1.Controller)('docentes'),
    __metadata("design:paramtypes", [docentes_service_1.DocentesService])
], DocentesController);
