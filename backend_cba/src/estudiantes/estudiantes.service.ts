import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';

@Injectable()
export class EstudiantesService {
  constructor(
    @InjectRepository(Estudiante)
    private readonly estudianteRepository: Repository<Estudiante>,
  ) { }

  public async create(createEstudianteDto: CreateEstudianteDto): Promise<Estudiante> {
    const estudiante = await this.estudianteRepository.findOne({
      where: {
        nombres: createEstudianteDto.nombres.trim(),
        deletedAt: IsNull(),
      }
    });
    if (estudiante) throw new Error('Materia ya existe con ese nombre');
    return this.estudianteRepository.save(createEstudianteDto);
  }

  public async findAll(): Promise<Estudiante[]> {
    const estudiantes = this.estudianteRepository.find({
      where: {
        deletedAt: IsNull()
      }
    });

    return estudiantes;
  }

  public async findOne(id: string): Promise<Estudiante> {
    const estudiante = await this.estudianteRepository.findOne({
      where: {
        id: id,
        deletedAt: IsNull()
      }
    });
    if (!estudiante) throw new NotFoundException(`Estudiante con ID ${id} no encontrado`);
    return estudiante;
  }

  public async update(updateEstudianteDto: UpdateEstudianteDto): Promise<Estudiante> {
    const estudiante = await this.findOne(updateEstudianteDto.id);
    Object.assign(estudiante, updateEstudianteDto);
    return await this.estudianteRepository.save(estudiante);
  }

  public async remove(id: string): Promise<Estudiante> {
    const estudiante = await this.findOne(id);
    Object.assign(estudiante, { deletedAt: new Date() });
    return this.estudianteRepository.save(estudiante);
  }
}
