"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SistemaService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const sistema_entity_1 = require("./entities/sistema.entity");
const bcrypt = __importStar(require("bcrypt"));
const jwt = __importStar(require("jsonwebtoken"));
let SistemaService = class SistemaService {
    constructor(sistemaRepository) {
        this.sistemaRepository = sistemaRepository;
    }
    // Crear usuario con contraseña cifrada
    async create(createSistemaDto) {
        const hashedPassword = await bcrypt.hash(createSistemaDto.password, 10);
        const nuevoUsuario = this.sistemaRepository.create(Object.assign(Object.assign({}, createSistemaDto), { password: hashedPassword }));
        return this.sistemaRepository.save(nuevoUsuario);
    }
    // Listar todos los usuarios
    findAll() {
        return this.sistemaRepository.find();
    }
    // Buscar un usuario por ID
    findOne(id) {
        return this.sistemaRepository.findOne({ where: { id } });
    }
    // Actualizar usuario (si cambia la contraseña, la encripta)
    async update(id, updateSistemaDto) {
        const updatedData = Object.assign({}, updateSistemaDto);
        if (updateSistemaDto.password) {
            updatedData.password = await bcrypt.hash(updateSistemaDto.password, 10);
        }
        await this.sistemaRepository.update(id, updatedData);
        return this.findOne(id);
    }
    // Actualizar contraseña sin modificar directamente el DTO
    async updatePassword(id, password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        await this.sistemaRepository.update(id, { password: hashedPassword });
    }
    // Eliminar usuario
    async remove(id) {
        const user = await this.findOne(id);
        if (!user) {
            throw new Error(`Usuario con ID ${id} no encontrado`);
        }
        return this.sistemaRepository.remove(user);
    }
    // LOGIN: Validar usuario y devolver token
    async login(username, password) {
        const user = await this.sistemaRepository.findOne({ where: { username } });
        if (!user || !user.password) {
            throw new common_1.UnauthorizedException('Usuario o contraseña incorrectos');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new common_1.UnauthorizedException('Usuario o contraseña incorrectos');
        }
        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET || 'secreto123', // Puedes mejorar esto usando ConfigService
        { expiresIn: '1h' });
        return { token };
    }
};
exports.SistemaService = SistemaService;
exports.SistemaService = SistemaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(sistema_entity_1.Sistema)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SistemaService);
