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
exports.Experiencia = void 0;
const auditable_entity_class_1 = require("../../config/auditable-entity.class");
const typeorm_1 = require("typeorm");
let Experiencia = class Experiencia extends auditable_entity_class_1.AuditableEntity {
};
exports.Experiencia = Experiencia;
__decorate([
    (0, typeorm_1.PrimaryColumn)('char', { length: 36 }),
    (0, typeorm_1.Generated)('uuid'),
    __metadata("design:type", String)
], Experiencia.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 100, nullable: false }),
    __metadata("design:type", String)
], Experiencia.prototype, "titulo", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 100, nullable: false }),
    __metadata("design:type", String)
], Experiencia.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Experiencia.prototype, "url_image", void 0);
__decorate([
    (0, typeorm_1.Column)('date', { name: 'fecha' }),
    __metadata("design:type", Date)
], Experiencia.prototype, "fecha", void 0);
exports.Experiencia = Experiencia = __decorate([
    (0, typeorm_1.Entity)('experiencias')
], Experiencia);
