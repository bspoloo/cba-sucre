"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocentesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const docentes_service_1 = require("./docentes.service");
const docentes_controller_1 = require("./docentes.controller");
const docente_entity_1 = require("./entities/docente.entity");
const usuario_entity_1 = require("../usuarios/entities/usuario.entity");
const materia_entity_1 = require("../materias/entities/materia.entity");
const usuarios_module_1 = require("../usuarios/usuarios.module");
const materias_module_1 = require("../materias/materias.module");
let DocentesModule = class DocentesModule {
};
exports.DocentesModule = DocentesModule;
exports.DocentesModule = DocentesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([docente_entity_1.Docente, usuario_entity_1.Usuario, materia_entity_1.Materia]),
            usuarios_module_1.UsuariosModule,
            materias_module_1.MateriasModule
        ],
        controllers: [docentes_controller_1.DocentesController],
        providers: [docentes_service_1.DocentesService],
        exports: [docentes_service_1.DocentesService],
    })
], DocentesModule);
