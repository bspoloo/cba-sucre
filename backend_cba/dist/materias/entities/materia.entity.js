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
exports.Materia = void 0;
const typeorm_1 = require("typeorm");
// import { Estudiante } from '../../estudiantes/entities/estudiante.entity';
const docente_entity_1 = require("../../docentes/entities/docente.entity");
let Materia = class Materia {
};
exports.Materia = Materia;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Materia.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 255, nullable: false }),
    __metadata("design:type", String)
], Materia.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 50, nullable: false }),
    __metadata("design:type", String)
], Materia.prototype, "aula", void 0);
__decorate([
    (0, typeorm_1.Column)('time', { nullable: false }) // Asegúrate de que el tipo sea correcto
    ,
    __metadata("design:type", String)
], Materia.prototype, "hora", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => docente_entity_1.Docente, docente => docente.materia),
    __metadata("design:type", Array)
], Materia.prototype, "docentes", void 0);
exports.Materia = Materia = __decorate([
    (0, typeorm_1.Entity)('materias')
], Materia);
