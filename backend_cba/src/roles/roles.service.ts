import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';

@Injectable()
export class RolesService {
  public constructor(
    @InjectRepository(Role) private readonly rolesRepository: Repository<Role>,
  ) { }
  public async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const role = await this.rolesRepository.findOne({
      where: { name: createRoleDto.name.trim() },
    });
    if (role) {
      throw new Error('Role already exists');
    }
    return this.rolesRepository.save(createRoleDto);
  }

  public async findAll(): Promise<Role[]> {
    const roles = this.rolesRepository.find({
      where: {
        deletedAt: IsNull()
      }
    });
    return roles;
  }

  public async findByName(name: string): Promise<Role> {
    const role = await this.rolesRepository.findOne({
      where: {
        name: name,
        deletedAt: IsNull()
      }
    });

    if (!role) {
      throw new Error(`Role with not exists with name ${name}`);
    }
    return role;
  }

  public async findOne(id: string): Promise<Role> {
    const role = await this.rolesRepository.findOne({
      where: {
        id: id,
        deletedAt: IsNull()
      }
    });

    if (!role) {
      throw new Error(`Role with not exists with${id}`);
    }
    return role;
  }

  public async update(updateRoleDto: UpdateRoleDto): Promise<Role> {
    const role = await this.rolesRepository.findOne({
      where: {
        id: updateRoleDto.id,
        deletedAt: IsNull()
      }
    });

    if (!role) {
      throw new Error(`Role with not exists with${updateRoleDto.id}`);
    }
    Object.assign(role, updateRoleDto);
    return this.rolesRepository.save(updateRoleDto);
  }

  public async remove(id: string): Promise<Role> {
    const role = await this.rolesRepository.findOne({
      where: {
        id: id,
        deletedAt: IsNull()
      }
    });

    if (!role) {
      throw new Error(`Role with not exists with${id}`);
    }
    Object.assign(role, { deletedAt: new Date() });
    return this.rolesRepository.save(role);
  }
}
