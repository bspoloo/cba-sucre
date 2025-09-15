"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExperienciasModule = void 0;
const common_1 = require("@nestjs/common");
const experiencias_service_1 = require("./experiencias.service");
const experiencias_controller_1 = require("./experiencias.controller");
const experiencia_entity_1 = require("./entities/experiencia.entity");
const typeorm_1 = require("@nestjs/typeorm");
let ExperienciasModule = class ExperienciasModule {
};
exports.ExperienciasModule = ExperienciasModule;
exports.ExperienciasModule = ExperienciasModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([experiencia_entity_1.Experiencia])], // Asegúrate de que la entidad sea registrada aquí
        providers: [experiencias_service_1.ExperienciasService],
        controllers: [experiencias_controller_1.ExperienciasController],
    })
], ExperienciasModule);
