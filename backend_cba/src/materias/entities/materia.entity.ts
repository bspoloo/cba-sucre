import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
  Generated,
} from 'typeorm';
import { Docente } from '../../docentes/entities/docente.entity';
import { Estudiante } from '@/estudiantes/entities/estudiante.entity';
import { AuditableEntity } from '@/config/auditable-entity.class';

@Entity('materias')
export class Materia extends AuditableEntity {
  @PrimaryColumn('char', { length: 36 })
  @Generated('uuid')
  id!: string;

  @Column('varchar', { length: 255, nullable: false })
  nombre!: string;

  @Column('varchar', { length: 50, nullable: false })
  aula!: string;

  @Column('time', { nullable: false })
  hora!: string;

  @ManyToMany(() => Estudiante, (estudiante: Estudiante) => estudiante.materias)
  estudiantes!: Estudiante[];

  @OneToMany(() => Docente, docente => docente.materia)
  docentes!: Docente[];
}
