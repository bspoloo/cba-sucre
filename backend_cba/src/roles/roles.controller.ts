import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) { }

  @Post()
  public async create(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
    try {
      return this.rolesService.create(createRoleDto);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error('An unknown error occurred');
      }
    }
  }

  @Get()
  public async findAll(): Promise<Role[]> {
    try {
      return this.rolesService.findAll();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error('An unknown error occurred');
      }
    }
  }

  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<Role> {
    try {
      return this.rolesService.findOne(id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error('An unknown error occurred');
      }
    }
  }

  @Get('name/:name')
  public async findByName(@Param('name') name: string): Promise<Role> {
    try {
      return this.rolesService.findByName(name);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error('An unknown error occurred');
      }
    }
  }

  @Patch(':id')
  public async update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto): Promise<Role> {
    try {
      return this.rolesService.update(updateRoleDto);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error('An unknown error occurred');
      }
    }
  }

  @Delete(':id')
  public async remove(@Param('id') id: string): Promise<Role> {
    try {
      return this.rolesService.remove(id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error('An unknown error occurred');
      }
    }
  }
}
