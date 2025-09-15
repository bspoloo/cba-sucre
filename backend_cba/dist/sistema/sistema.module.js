"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SistemaModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const sistema_entity_1 = require("./entities/sistema.entity");
const sistema_controller_1 = require("./sistema.controller");
const sistema_service_1 = require("./sistema.service");
const auth_module_1 = require("../auth/auth.module"); // 👈 ajusta la ruta relativa al módulo de Auth
let SistemaModule = class SistemaModule {
};
exports.SistemaModule = SistemaModule;
exports.SistemaModule = SistemaModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([sistema_entity_1.Sistema]),
            auth_module_1.AuthModule, // 🔹 aquí sí va
        ],
        controllers: [sistema_controller_1.SistemaController],
        providers: [sistema_service_1.SistemaService],
    })
], SistemaModule);
