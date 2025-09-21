import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { EstudiantesService } from './estudiantes.service';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { Estudiante } from './entities/estudiante.entity';

@Controller('estudiantes')
export class EstudiantesController {
  constructor(private readonly estudiantesService: EstudiantesService) { }

  @Post()
  public async create(@Body() createEstudianteDto: CreateEstudianteDto): Promise<Estudiante> {
    try {
      return this.estudiantesService.create(createEstudianteDto);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error('An unknown error occurred');
      }
    }
  }

  @Get()
  public async findAll(): Promise<Estudiante[]> {
    try {
      return this.estudiantesService.findAll();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error('An unknown error occurred');
      }
    }
  }

  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<Estudiante> {
    try {
      return this.estudiantesService.findOne(id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error('An unknown error occurred');
      }
    }
  }

  @Put()
  public async update(@Body() updateEstudianteDto: UpdateEstudianteDto): Promise<Estudiante> {
    try {
      console.log(updateEstudianteDto);
      
      return this.estudiantesService.update(updateEstudianteDto);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error('An unknown error occurred');
      }
    }
  }

  @Delete(':id')
  public async remove(@Param('id') id: string): Promise<Estudiante> {
    try {
      return this.estudiantesService.remove(id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error('An unknown error occurred');
      }
    }
  }
}
