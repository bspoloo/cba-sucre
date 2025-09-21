import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Materia } from './entities/materia.entity';
import { CreateMateriaDto } from './dto/create-materia.dto';
import { UpdateMateriaDto } from './dto/update-materia.dto';

@Injectable()
export class MateriasService {
  constructor(
    @InjectRepository(Materia)
    private readonly materiaRepository: Repository<Materia>,
  ) { }

  public async create(createMateriaDto: CreateMateriaDto): Promise<Materia> {
    const materia = await this.materiaRepository.findOne({
      where: {
        nombre: createMateriaDto.nombre.trim(),
        deletedAt: IsNull(),
      }
    });
    if (materia) throw new Error('Materia ya existe con ese nombre');
    return await this.materiaRepository.save(createMateriaDto);
  }

  public async findAll(): Promise<Materia[]> {
    const materias = this.materiaRepository.find({
      where: {
        deletedAt: IsNull()
      }
    });
    return materias;
  }

  public async findOne(id: string): Promise<Materia> {
    const materia = await this.materiaRepository.findOne({
      where: {
        id: id,
        deletedAt: IsNull()
      }
    }
    );
    if (!materia) throw new NotFoundException(`Materia con ID ${id} no encontrado`);
    return materia;
  }

  public async update(updateMateriaDto: UpdateMateriaDto): Promise<Materia> {
    const materia = await this.findOne(updateMateriaDto.id);

    Object.assign(materia, updateMateriaDto);
    return await this.materiaRepository.save(materia);
  }

  public async remove(id: string): Promise<Materia> {
    const materia = await this.findOne(id);
    Object.assign(materia, { deletedAt: new Date() });
    return this.materiaRepository.save(materia);
  }
}
