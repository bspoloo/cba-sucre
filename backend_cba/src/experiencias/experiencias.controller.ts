import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { ExperienciasService } from './experiencias.service';
import { CreateExperienciaDto } from './dto/create-experiencia.dto';
import { UpdateExperienciaDto } from './dto/update-experiencia.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Experiencia } from './entities/experiencia.entity';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('experiencias')
@Controller('experiencias')
export class ExperienciasController {
  constructor(private readonly experienciasService: ExperienciasService) { }

  @Post()
  public async create(@Body() createExperienciaDto: CreateExperienciaDto): Promise<Experiencia> {
    try {
      return this.experienciasService.create(createExperienciaDto);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error('An unknown error occurred');
      }
    }
  }

  @Get()
  public async findAll(): Promise<Experiencia[]> {
    try {
      return this.experienciasService.findAll();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error('An unknown error occurred');
      }
    }
  }

  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<Experiencia> {
    try {
      return this.experienciasService.findOne(id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error('An unknown error occurred');
      }
    }
  }

  @Put()
  public async update(@Body() updateExperienciaDto: UpdateExperienciaDto): Promise<Experiencia> {
    try {
      return this.experienciasService.update(updateExperienciaDto);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error('An unknown error occurred');
      }
    }
  }

  @Delete(':id')
  public async remove(@Param('id') id: string): Promise<Experiencia> {
    try {
      return this.experienciasService.remove(id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error('An unknown error occurred');
      }
    }
  }
}
