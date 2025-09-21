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
exports.CreateUsuarioDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateUsuarioDto {
}
exports.CreateUsuarioDto = CreateUsuarioDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'El campo usario no debe ser vacío' }),
    (0, class_validator_1.IsString)({ message: 'El campo usario debe ser de tipo cadena' }),
    (0, class_validator_1.MaxLength)(12, { message: 'El campo usario no debe ser mayor a 12 caracteres' }),
    (0, class_validator_1.MinLength)(4, { message: 'El campo usario no debe ser menor a 4 caracteres' }),
    __metadata("design:type", String)
], CreateUsuarioDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'El campo email no debe ser vacío' }),
    (0, class_validator_1.IsEmail)({}, { message: 'El campo email debe tener el formato correcto' }),
    (0, class_validator_1.MaxLength)(50, { message: 'El campo usario no debe ser mayor a 50 caracteres' }),
    (0, class_validator_1.MinLength)(10, { message: 'El campo usario no debe ser menor a 10 caracteres' }),
    __metadata("design:type", String)
], CreateUsuarioDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'El campo tipo Usuario no debe ser vacío' }),
    (0, class_validator_1.IsString)({ message: 'El campo tipo Usuario debe tener el formato correcto' }),
    (0, class_validator_1.MaxLength)(15, { message: 'El campo tipo Usuario no debe ser mayor a 15 caracteres' }),
    (0, class_validator_1.MinLength)(3, { message: 'El campo tipo Usuario no debe ser menor a 3 caracteres' }),
    __metadata("design:type", String)
], CreateUsuarioDto.prototype, "rol", void 0);
