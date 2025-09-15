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
exports.CreateMateriaDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateMateriaDto {
}
exports.CreateMateriaDto = CreateMateriaDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Matemáticas' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El campo nombre no debe ser vacío' }),
    (0, class_validator_1.IsString)({ message: 'El campo nombre debe ser de tipo cadena' }),
    (0, class_validator_1.MaxLength)(100, { message: 'El campo nombre no debe ser mayor a 100 caracteres' }),
    (0, class_validator_1.MinLength)(2, { message: 'El campo nombre no debe ser menor a 2 caracteres' }),
    __metadata("design:type", String)
], CreateMateriaDto.prototype, "nombre", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Aula 101' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El campo aula no debe ser vacío' }),
    (0, class_validator_1.IsString)({ message: 'El campo aula debe ser de tipo cadena' }),
    (0, class_validator_1.MaxLength)(100, { message: 'El campo aula no debe ser mayor a 100 caracteres' }),
    (0, class_validator_1.MinLength)(2, { message: 'El campo aula no debe ser menor a 2 caracteres' }),
    __metadata("design:type", String)
], CreateMateriaDto.prototype, "aula", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El campo hora no debe ser vacío' }),
    (0, class_validator_1.IsString)({ message: 'El campo hora debe ser de tipo cadena' }),
    (0, swagger_1.ApiProperty)({ example: '08:00' }),
    __metadata("design:type", String)
], CreateMateriaDto.prototype, "hora", void 0);
