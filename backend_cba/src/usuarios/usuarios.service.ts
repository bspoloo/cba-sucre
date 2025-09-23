import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { In, IsNull, Repository } from 'typeorm';
import { RolesService } from '@/roles/roles.service';
import { Docente } from '@/docentes/entities/docente.entity';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario) private usuariosRepository: Repository<Usuario>,
    @InjectRepository(Docente) private docentesRepository: Repository<Docente>,
    private readonly rolesService: RolesService
  ) { }

  public async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    try {
      const exists = await this.usuariosRepository.findOneBy({
        name: createUsuarioDto.name.trim(),
        deletedAt: IsNull()
      });

      if (exists) {
        throw new ConflictException('El usuario ya existe');
      }
      const role = await this.rolesService.findByName(createUsuarioDto.role);
      const usuario = this.usuariosRepository.create({
        name: createUsuarioDto.name.trim(),
        password: process.env.DEFAULT_PASSWORD || 'default_password',
        email: createUsuarioDto.email.trim(),
        role: role,
      });

      const usuarioBd = await this.usuariosRepository.save(usuario);
      usuarioBd.password = '';
      return usuarioBd;

    } catch (error) {
      console.error('Error al crear el usuario:', error);
      throw new InternalServerErrorException('Error al crear el usuario');
    }
  }

  public async findAll(): Promise<Usuario[]> {
    const users = this.usuariosRepository.find({
      where: {
        deletedAt: IsNull()
      },
      relations: ['role', 'docente']
    });
    return users;
  }

  public async findAllWithoutRelations(): Promise<Usuario[]> {

    const users = await this.usuariosRepository.find({
      where: {
        deletedAt: IsNull()
      },
      relations: ['role', 'docente']
    });
    console.log(users);

    return users.filter((user: Usuario) => !user.docente);
  }

  public async findOne(id: string): Promise<Usuario> {
    const user = await this.usuariosRepository.findOne({
      where: {
        id: id,
        deletedAt: IsNull()
      },
      relations: ['role']
    });
    if (!user) {
      throw new NotFoundException(`El usuario ${id} no existe`);
    }
    return user;
  }

  public async update(updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
    const usuario = await this.findOne(updateUsuarioDto.id);

    const docente = updateUsuarioDto.docenteId
      ? await this.docentesRepository.findOne({
        where: { id: updateUsuarioDto.docenteId, deletedAt: IsNull() },
      })
      : null;

    usuario.name = updateUsuarioDto.name!;
    usuario.email = updateUsuarioDto.email!;
    usuario.docente = docente!;
    const { password, ...usuarioSinPassword } = usuario;
    await this.usuariosRepository.update(usuario.id, usuarioSinPassword);
    return this.findOne(usuario.id);
  }


  public async remove(id: string) {
    const usuario = await this.findOne(id);
    const usuarioUpdate = Object.assign(usuario, { deletedAt: new Date() });
    return this.usuariosRepository.save(usuarioUpdate);
  }

  public async validate(name: string, password: string): Promise<Usuario> {
    const user = await this.usuariosRepository.findOne({
      where: {
        name: name,
        deletedAt: IsNull(),
      },
      relations: ['role']
    });

    if (!user) throw new NotFoundException('Usuario inexistente');

    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    user.password = '';
    return user;
  }
}
