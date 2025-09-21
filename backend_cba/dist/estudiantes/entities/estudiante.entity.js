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
exports.Estudiante = void 0;
const auditable_entity_class_1 = require("../../config/auditable-entity.class");
const materia_entity_1 = require("../../materias/entities/materia.entity");
const typeorm_1 = require("typeorm");
let Estudiante = class Estudiante extends auditable_entity_class_1.AuditableEntity {
};
exports.Estudiante = Estudiante;
__decorate([
    (0, typeorm_1.PrimaryColumn)('char', { length: 36 }),
    (0, typeorm_1.Generated)('uuid'),
    __metadata("design:type", String)
], Estudiante.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { unique: true, nullable: false }),
    __metadata("design:type", Number)
], Estudiante.prototype, "ci", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 50, nullable: false }),
    __metadata("design:type", String)
], Estudiante.prototype, "nombres", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 100, nullable: false }),
    __metadata("design:type", String)
], Estudiante.prototype, "apellidos", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 20, nullable: false }),
    __metadata("design:type", String)
], Estudiante.prototype, "telefono", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => materia_entity_1.Materia, materia => materia.estudiantes),
    (0, typeorm_1.JoinTable)({ name: 'estudiante_materia' }),
    __metadata("design:type", Array)
], Estudiante.prototype, "materias", void 0);
exports.Estudiante = Estudiante = __decorate([
    (0, typeorm_1.Entity)('estudiantes')
], Estudiante);
