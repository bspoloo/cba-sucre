import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Sistema } from './entities/sistema.entity';

import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { CreateSistemaDto } from './dto/create-sistema.dto';
import { UpdateSistemaDto } from './dto/update-sistema.dto';

@Injectable()
export class SistemaService {
  constructor(
    @InjectRepository(Sistema)
    private readonly sistemaRepository: Repository<Sistema>,
  ) { }

  public async create(createSistemaDto: CreateSistemaDto): Promise<Sistema> {
    const hashedPassword = await bcrypt.hash(createSistemaDto.password, 10);
    const nuevoUsuario = this.sistemaRepository.create({
      ...createSistemaDto,
      password: hashedPassword,
    });
    return this.sistemaRepository.save(nuevoUsuario);
  }

  public async findAll(): Promise<Sistema[]> {
    return this.sistemaRepository.find();
  }

  public async findOne(id: string): Promise<Sistema> {
    const system = await this.sistemaRepository.findOne({
      where: {
        id: id,
        deletedAt: IsNull()
      }
    });
    if (!system) throw new NotFoundException('Sistema inexistente');
    return system;
  }

  public async update(updateSistemaDto: UpdateSistemaDto): Promise<Sistema> {
    const system = await this.findOne(updateSistemaDto.id);
    if (updateSistemaDto.password) {
      system.password = await bcrypt.hash(updateSistemaDto.password, 10);
    }
    Object.assign(system, updateSistemaDto);
    return this.sistemaRepository.save(system);
  }

  public async updatePassword(id: string, password: string): Promise<{ message: string, success: boolean }> {
    const hashedPassword: string = await bcrypt.hash(password, 10);
    await this.sistemaRepository.update(id, { password: hashedPassword });
    return {
      message: 'contraseña acutalizada correctamente',
      success: true
    }
  }

  public async remove(id: string): Promise<Sistema> {
    const user = await this.findOne(id);
    Object.assign(user, { deletedAt: new Date() });
    return this.sistemaRepository.save(user);
  }

  public async login(username: string, password: string): Promise<{ token: string }> {
    const user = await this.sistemaRepository.findOne({ where: { username } });
    if (!user || !user.password) {
      throw new UnauthorizedException('Usuario o contraseña incorrectos');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Usuario o contraseña incorrectos');
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET || 'secreto123',
      { expiresIn: '1h' },
    );

    return { token };
  }
}
