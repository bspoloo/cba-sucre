"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstudianteMateriaModule = void 0;
const common_1 = require("@nestjs/common");
const estudiante_materia_service_1 = require("./estudiante-materia.service");
const estudiante_materia_controller_1 = require("./estudiante-materia.controller");
const typeorm_1 = require("@nestjs/typeorm");
const estudiante_entity_1 = require("../estudiantes/entities/estudiante.entity");
const materia_entity_1 = require("../materias/entities/materia.entity");
const estudiantes_service_1 = require("../estudiantes/estudiantes.service");
const materias_service_1 = require("../materias/materias.service");
const estudiante_materia_entity_1 = require("./entities/estudiante-materia.entity");
let EstudianteMateriaModule = class EstudianteMateriaModule {
};
exports.EstudianteMateriaModule = EstudianteMateriaModule;
exports.EstudianteMateriaModule = EstudianteMateriaModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([estudiante_materia_entity_1.EstudianteMateria, estudiante_entity_1.Estudiante, materia_entity_1.Materia])],
        controllers: [estudiante_materia_controller_1.EstudianteMateriaController],
        providers: [estudiante_materia_service_1.EstudianteMateriaService, estudiantes_service_1.EstudiantesService, materias_service_1.MateriasService],
        exports: [estudiante_materia_service_1.EstudianteMateriaService],
    })
], EstudianteMateriaModule);
