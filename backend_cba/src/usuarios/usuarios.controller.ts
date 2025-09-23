import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Public } from '../auth/decorators/auth-public.decorator';
import { Usuario } from './entities/usuario.entity';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('usuarios')
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) { }

  @Public()
  @Post()
  public async create(@Body() createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {

    try {
      return this.usuariosService.create(createUsuarioDto);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error('An unknown error occurred');
      }
    }
  }

  @Get()
  public async findAll(): Promise<Usuario[]> {
    try {
      return this.usuariosService.findAll();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error('An unknown error occurred');
      }
    }
  }

  @Get('/no-relations')
  public async findAllWithoutRelatins(): Promise<Usuario[]> {
    try {
      return this.usuariosService.findAllWithoutRelations();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error('An unknown error occurred');
      }
    }
  }



  @Put()
  public async update(@Body() updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
    try {
      return this.usuariosService.update(updateUsuarioDto);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error('An unknown error occurred');
      }
    }
  }

  @Delete(':id')
  public async remove(@Param('id') id: string): Promise<Usuario> {
    try {
      return this.usuariosService.remove(id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error('An unknown error occurred');
      }
    }
  }
}
