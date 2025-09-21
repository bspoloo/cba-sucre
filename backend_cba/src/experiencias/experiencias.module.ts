import { Module } from '@nestjs/common';
import { ExperienciasService } from './experiencias.service';
import { ExperienciasController } from './experiencias.controller';
import { Experiencia } from './entities/experiencia.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [TypeOrmModule.forFeature([Experiencia])],
  providers: [ExperienciasService],
  controllers: [ExperienciasController],
})
export class ExperienciasModule {}
