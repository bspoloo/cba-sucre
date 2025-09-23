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
exports.Role = void 0;
const auditable_entity_class_1 = require("../../config/auditable-entity.class");
const usuario_entity_1 = require("../../usuarios/entities/usuario.entity");
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
let Role = class Role extends auditable_entity_class_1.AuditableEntity {
};
exports.Role = Role;
__decorate([
    (0, typeorm_1.PrimaryColumn)('char', { length: 36 }),
    (0, typeorm_1.Generated)('uuid'),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], Role.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 255, nullable: false }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Role.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 255, nullable: false }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Role.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => usuario_entity_1.Usuario, usuario => usuario.role),
    __metadata("design:type", Array)
], Role.prototype, "users", void 0);
exports.Role = Role = __decorate([
    (0, typeorm_1.Entity)('roles')
], Role);
