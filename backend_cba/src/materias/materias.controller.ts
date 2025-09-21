import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { MateriasService } from './materias.service';
import { CreateMateriaDto } from './dto/create-materia.dto';
import { UpdateMateriaDto } from './dto/update-materia.dto';
import { Materia } from './entities/materia.entity';

@Controller('materias')
export class MateriasController {
  constructor(private readonly materiasService: MateriasService) { }

  @Post()
  public async create(@Body() createMateriaDto: CreateMateriaDto): Promise<Materia> {
    try {
      return this.materiasService.create(createMateriaDto);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error('An unknown error occurred');
      }
    }
  }

  @Get()
  public async findAll(): Promise<Materia[]> {
    try {
      return this.materiasService.findAll();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error('An unknown error occurred');
      }
    }
  }

  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<Materia> {
    try {
      return this.materiasService.findOne(id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error('An unknown error occurred');
      }
    }
  }

  @Put()
  public async update(@Body() updateMateriaDto: UpdateMateriaDto): Promise<Materia> {
    try {
      return this.materiasService.update(updateMateriaDto);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error('An unknown error occurred');
      }
    }
  }

  @Delete(':id')
  public async remove(@Param('id') id: string): Promise<Materia> {
    try {
      return this.materiasService.remove(id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error('An unknown error occurred');
      }
    }
  }
}
