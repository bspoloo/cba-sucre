import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { Usuario } from './entities/usuario.entity';
import { RolesService } from '@/roles/roles.service';
import { Role } from '@/roles/entities/role.entity';
import { Docente } from '@/docentes/entities/docente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Role, Docente])],
  controllers: [UsuariosController],
  providers: [UsuariosService, RolesService],
  exports: [UsuariosService],
})
export class UsuariosModule {}

