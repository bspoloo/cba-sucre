import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Docente } from './entities/docente.entity';
import { CreateDocenteDto } from './dto/create-docente.dto';
import { UpdateDocenteDto } from './dto/update-docente.dto';
import { UsuariosService } from '@/usuarios/usuarios.service';
import { MateriasService } from '@/materias/materias.service';
import { Usuario } from '@/usuarios/entities/usuario.entity';

@Injectable()
export class DocentesService {
  constructor(
    @InjectRepository(Docente)
    private readonly docenteRepository: Repository<Docente>,
    private readonly userService: UsuariosService,
    private readonly materiaService: MateriasService,
  ) { }

  public async create(createDocenteDto: CreateDocenteDto): Promise<Docente> {
    const docenteExistente = await this.docenteRepository.findOne({
      where: {
        nombres: createDocenteDto.nombres.trim(),
        deletedAt: IsNull(),
      }
    });

    if (docenteExistente) {
      throw new Error('Docente ya existe con ese nombre');
    }

    const usuario = await this.userService.findOne(createDocenteDto.usuario_id);
    const materia = await this.materiaService.findOne(createDocenteDto.materia_id);

    const docente = this.docenteRepository.create({
      ...createDocenteDto,
      materia,
      usuario
    });
    const docenteSaved = await this.docenteRepository.save(docente);
    const usuarioUpdated = await this.userService.update({
      id: usuario.id,
      docenteId: docenteSaved.id,
      role: usuario.role?.name,
    });
    docenteSaved.usuario = usuarioUpdated;
    return await this.docenteRepository.save(docenteSaved);
  }


  public async findAll(): Promise<Docente[]> {
    const docentes = this.docenteRepository.find({
      where: {
        deletedAt: IsNull()
      },
      relations: ['usuario', 'materia']
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
