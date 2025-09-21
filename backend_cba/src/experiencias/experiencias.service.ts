import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateExperienciaDto } from './dto/create-experiencia.dto';
import { UpdateExperienciaDto } from './dto/update-experiencia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Experiencia } from './entities/experiencia.entity';
import { IsNull, Repository } from 'typeorm';

@Injectable()
export class ExperienciasService {
  constructor(
    @InjectRepository(Experiencia) private readonly experienciasRepository: Repository<Experiencia>
  ) { }
  public async create(createExperienciaDto: CreateExperienciaDto): Promise<Experiencia> {
    const experiencia = this.experienciasRepository.create(createExperienciaDto);
    return this.experienciasRepository.save(experiencia);
  }

  public async findAll(): Promise<Experiencia[]> {
    const experiencias = this.experienciasRepository.find({
      where: {
        deletedAt: IsNull()
      }
    });
    return experiencias;
  }

  public async findOne(id: string): Promise<Experiencia> {
    const experiencia = await this.experienciasRepository.findOne({
      where: {
        deletedAt: IsNull()
      }
    });
    if (!experiencia) throw new NotFoundException(`Experiencia con ID ${id} no encontrado`);

    return experiencia;
  }

  public async update(updateExperienciaDto: UpdateExperienciaDto): Promise<Experiencia> {
    const experiencia = await this.findOne(updateExperienciaDto.id);
    Object.assign(experiencia, updateExperienciaDto);
    return this.experienciasRepository.save(updateExperienciaDto);
  }

  public async remove(id: string): Promise<Experiencia> {
    const experiencia = await this.findOne(id);
    Object.assign(experiencia, { deletedAt: new Date() });
    return this.experienciasRepository.save(experiencia);
  }
}
