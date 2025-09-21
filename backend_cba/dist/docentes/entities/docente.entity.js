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
exports.Docente = void 0;
const typeorm_1 = require("typeorm");
const materia_entity_1 = require("../../materias/entities/materia.entity"); // Adjusted relative path
const usuario_entity_1 = require("../../usuarios/entities/usuario.entity");
const auditable_entity_class_1 = require("../../config/auditable-entity.class");
let Docente = class Docente extends auditable_entity_class_1.AuditableEntity {
};
exports.Docente = Docente;
__decorate([
    (0, typeorm_1.PrimaryColumn)('char', { length: 36 }),
    (0, typeorm_1.Generated)('uuid'),
    __metadata("design:type", String)
], Docente.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { nullable: false }),
    __metadata("design:type", Number)
], Docente.prototype, "ci", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 50, nullable: false }),
    __metadata("design:type", String)
], Docente.prototype, "nombres", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 50, nullable: false }),
    __metadata("design:type", String)
], Docente.prototype, "apellidos", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { nullable: false }),
    __metadata("design:type", Number)
], Docente.prototype, "telefono", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 100, nullable: false }),
    __metadata("design:type", String)
], Docente.prototype, "direccion", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => materia_entity_1.Materia, materia => materia.docentes),
    __metadata("design:type", materia_entity_1.Materia)
], Docente.prototype, "materia", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => usuario_entity_1.Usuario, (usuario) => usuario.docente),
    (0, typeorm_1.JoinColumn)({ name: 'id_usuario' }),
    __metadata("design:type", usuario_entity_1.Usuario)
], Docente.prototype, "usuario", void 0);
exports.Docente = Docente = __decorate([
    (0, typeorm_1.Entity)('docentes')
], Docente);
