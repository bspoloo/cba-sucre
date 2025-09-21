import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Docente } from './entities/docente.entity';
import { CreateDocenteDto } from './dto/create-docente.dto';
import { UpdateDocenteDto } from './dto/update-docente.dto';

@Injectable()
export class DocentesService {
  constructor(
    @InjectRepository(Docente)
    private readonly docenteRepository: Repository<Docente>,
  ) { }

  public async create(createDocenteDto: CreateDocenteDto): Promise<Docente> {
    const docente = await this.docenteRepository.findOne({
      where: {
        nombres: createDocenteDto.nombres.trim(),
        deletedAt: IsNull(),
      }
    });
    if (docente) throw new Error('Docente ya existe con ese nombre');
    return await this.docenteRepository.save(createDocenteDto);
  }

  public async findAll(): Promise<Docente[]> {
    const docentes = this.docenteRepository.find({
      where: {
        deletedAt: IsNull()
      }
    });
    return docentes;
  }

  public async findOne(id: string): Promise<Docente> {
    const docente = await this.docenteRepository.findOne({
      where: {
        id: id,
        deletedAt: IsNull()
      }
    });
    if (!docente) throw new NotFoundException(`Docente con ID ${id} no encontrado`);
    return docente;
  }

  public async update(updateDocenteDto: UpdateDocenteDto): Promise<Docente> {
    const docente = await this.findOne(updateDocenteDto.id);
    Object.assign(docente, updateDocenteDto);
    return this.docenteRepository.save(docente);
  }

  public async remove(id: string): Promise<Docente> {
    const docente = await this.findOne(id);
    Object.assign(docente, { deletedAt: new Date() });
    return this.docenteRepository.save(docente);
  }
}
