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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesService = void 0;
const common_1 = require("@nestjs/common");
const role_entity_1 = require("./entities/role.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let RolesService = class RolesService {
    constructor(rolesRepository) {
        this.rolesRepository = rolesRepository;
    }
    async create(createRoleDto) {
        const role = await this.rolesRepository.findOne({
            where: { name: createRoleDto.name.trim() },
        });
        if (role) {
            throw new Error('Role already exists');
        }
        return this.rolesRepository.save(createRoleDto);
    }
    async findAll() {
        const roles = this.rolesRepository.find({
            where: {
                deletedAt: (0, typeorm_2.IsNull)()
            }
        });
        return roles;
    }
    async findByName(name) {
        const role = await this.rolesRepository.findOne({
            where: {
                name: name,
                deletedAt: (0, typeorm_2.IsNull)()
            }
        });
        if (!role) {
            throw new Error(`Role with not exists with name ${name}`);
        }
        return role;
    }
    async findOne(id) {
        const role = await this.rolesRepository.findOne({
            where: {
                id: id,
                deletedAt: (0, typeorm_2.IsNull)()
            }
        });
        if (!role) {
            throw new Error(`Role with not exists with${id}`);
        }
        return role;
    }
    async update(updateRoleDto) {
        const role = await this.rolesRepository.findOne({
            where: {
                id: updateRoleDto.id,
                deletedAt: (0, typeorm_2.IsNull)()
            }
        });
        if (!role) {
            throw new Error(`Role with not exists with${updateRoleDto.id}`);
        }
        Object.assign(role, updateRoleDto);
        return this.rolesRepository.save(updateRoleDto);
    }
    async remove(id) {
        const role = await this.rolesRepository.findOne({
            where: {
                id: id,
                deletedAt: (0, typeorm_2.IsNull)()
            }
        });
        if (!role) {
            throw new Error(`Role with not exists with${id}`);
        }
        Object.assign(role, { deletedAt: new Date() });
        return this.rolesRepository.save(role);
    }
};
exports.RolesService = RolesService;
exports.RolesService = RolesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(role_entity_1.Role)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RolesService);
