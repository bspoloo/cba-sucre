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
exports.LoginDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class LoginDto {
}
exports.LoginDto = LoginDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'docente123',
        description: 'Nombre de usuario (username)',
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El campo username no debe estar vacío' }),
    (0, class_validator_1.IsString)({ message: 'El campo username debe ser texto' }),
    (0, class_validator_1.MinLength)(2, { message: 'El campo username debe tener al menos 2 caracteres' }),
    (0, class_validator_1.MaxLength)(100, { message: 'El campo username no debe superar los 100 caracteres' }),
    __metadata("design:type", String)
], LoginDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '123456',
        description: 'Contraseña del usuario',
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El campo password no debe estar vacío' }),
    (0, class_validator_1.IsString)({ message: 'El campo password debe ser texto' }),
    (0, class_validator_1.MinLength)(2, { message: 'El campo password debe tener al menos 2 caracteres' }),
    (0, class_validator_1.MaxLength)(100, { message: 'El campo password no debe superar los 100 caracteres' }),
    __metadata("design:type", String)
], LoginDto.prototype, "password", void 0);
