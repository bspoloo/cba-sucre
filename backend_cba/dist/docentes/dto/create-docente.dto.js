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
exports.CreateDocenteDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateDocenteDto {
}
exports.CreateDocenteDto = CreateDocenteDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'El campo carnet de identidad no debe ser vacío' }),
    (0, class_validator_1.IsInt)({ message: 'El campo carnet de identidad debe ser de tipo entero' }),
    (0, class_validator_1.Min)(5, { message: 'El campo temporadas no debe ser menor a 5 digitos' }),
    __metadata("design:type", Number)
], CreateDocenteDto.prototype, "ci", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'El campo nombre no debe ser vacío' }),
    (0, class_validator_1.IsString)({ message: 'El campo nombre debe ser de tipo cadena' }),
    (0, class_validator_1.MaxLength)(100, { message: 'El campo nombre no debe ser mayor a 100 caracteres' }),
    (0, class_validator_1.MinLength)(2, { message: 'El campo nombre no debe ser menor a 2 caracteres' }),
    __metadata("design:type", String)
], CreateDocenteDto.prototype, "nombres", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'El campo nombre no debe ser vacío' }),
    (0, class_validator_1.IsString)({ message: 'El campo nombre debe ser de tipo cadena' }),
    (0, class_validator_1.MaxLength)(100, { message: 'El campo nombre no debe ser mayor a 100 caracteres' }),
    (0, class_validator_1.MinLength)(2, { message: 'El campo nombre no debe ser menor a 2 caracteres' }),
    __metadata("design:type", String)
], CreateDocenteDto.prototype, "apellidos", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'El campo precio por hora no debe ser vacío' }),
    (0, class_validator_1.IsNumber)({}, { message: 'El campo precio por hora debe ser de tipo número' }),
    __metadata("design:type", Number)
], CreateDocenteDto.prototype, "telefono", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'El campo nombre no debe ser vacío' }),
    (0, class_validator_1.IsString)({ message: 'El campo nombre debe ser de tipo cadena' }),
    (0, class_validator_1.MaxLength)(100, { message: 'El campo nombre no debe ser mayor a 100 caracteres' }),
    (0, class_validator_1.MinLength)(2, { message: 'El campo nombre no debe ser menor a 2 caracteres' }),
    __metadata("design:type", String)
], CreateDocenteDto.prototype, "direccion", void 0);
