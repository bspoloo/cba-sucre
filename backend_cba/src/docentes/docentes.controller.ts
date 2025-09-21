import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { DocentesService } from './docentes.service';
import { CreateDocenteDto } from './dto/create-docente.dto';
import { UpdateDocenteDto } from './dto/update-docente.dto';
import { Docente } from './entities/docente.entity';

@Controller('docentes')
export class DocentesController {
  constructor(private readonly docentesService: DocentesService) { }

  @Post()
  public async create(@Body() createDocenteDto: CreateDocenteDto): Promise<Docente> {
    try {
      return this.docentesService.create(createDocenteDto);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error('An unknown error occurred');
      }
    }
  }

  @Get()
  public async findAll(): Promise<Docente[]> {
    try {
      return this.docentesService.findAll();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error('An unknown error occurred');
      }
    }
  }

  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<Docente> {
    try {
      return this.docentesService.findOne(id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error('An unknown error occurred');
      }
    }
  }

  @Put(':id')
  public async update(@Param('id') id: string, @Body() updateDocenteDto: UpdateDocenteDto): Promise<Docente> {
    try {
      return this.docentesService.update(updateDocenteDto);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error('An unknown error occurred');
      }
    }
  }

  @Delete(':id')
  public async remove(@Param('id') id: string): Promise<Docente> {
    try {
      return this.docentesService.remove(id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error('An unknown error occurred');
      }
    }
  }
}
