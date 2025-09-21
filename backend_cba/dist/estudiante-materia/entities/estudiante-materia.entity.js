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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstudianteMateria = void 0;
const auditable_entity_class_1 = require("../../config/auditable-entity.class");
const estudiante_entity_1 = require("../../estudiantes/entities/estudiante.entity");
const materia_entity_1 = require("../../materias/entities/materia.entity");
const typeorm_1 = require("typeorm");
// @Entity('estudiante_materia')
class EstudianteMateria extends auditable_entity_class_1.AuditableEntity {
}
exports.EstudianteMateria = EstudianteMateria;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], EstudianteMateria.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => estudiante_entity_1.Estudiante, estudiante => estudiante.materias),
    __metadata("design:type", estudiante_entity_1.Estudiante)
], EstudianteMateria.prototype, "estudiante", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => materia_entity_1.Materia, materia => materia.estudiantes),
    __metadata("design:type", materia_entity_1.Materia)
], EstudianteMateria.prototype, "materia", void 0);
