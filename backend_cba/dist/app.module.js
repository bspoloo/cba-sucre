"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const experiencias_module_1 = require("./experiencias/experiencias.module");
const estudiantes_module_1 = require("./estudiantes/estudiantes.module");
const docentes_module_1 = require("./docentes/docentes.module");
const materias_module_1 = require("./materias/materias.module");
const sistema_module_1 = require("./sistema/sistema.module");
const usuarios_module_1 = require("./usuarios/usuarios.module");
const auth_module_1 = require("./auth/auth.module");
const roles_module_1 = require("./roles/roles.module");
const files_module_1 = require("./files/files.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: process.env.DB_HOST,
                port: Number(process.env.DB_PORT),
                username: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                autoLoadEntities: true,
                synchronize: true,
                dropSchema: false,
                logging: true,
            }),
            experiencias_module_1.ExperienciasModule,
            estudiantes_module_1.EstudiantesModule,
            docentes_module_1.DocentesModule,
            materias_module_1.MateriasModule,
            sistema_module_1.SistemaModule,
            usuarios_module_1.UsuariosModule,
            auth_module_1.AuthModule,
            roles_module_1.RolesModule,
            files_module_1.FilesModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
