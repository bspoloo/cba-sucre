import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocentesService } from './docentes.service';
import { DocentesController } from './docentes.controller';
import { Docente } from './entities/docente.entity';
import { UsuariosService } from '@/usuarios/usuarios.service';
import { MateriasService } from '@/materias/materias.service';
import { Usuario } from '@/usuarios/entities/usuario.entity';
import { Materia } from '@/materias/entities/materia.entity';
import { UsuariosModule } from '@/usuarios/usuarios.module';
import { MateriasModule } from '@/materias/materias.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Docente, Usuario, Materia]),
    UsuariosModule,
    MateriasModule
],
  controllers: [DocentesController],
  providers: [DocentesService],
  exports: [DocentesService],
})
export class DocentesModule {}
