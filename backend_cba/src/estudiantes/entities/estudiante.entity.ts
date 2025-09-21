import { AuditableEntity } from '@/config/auditable-entity.class';
import { Materia } from '@/materias/entities/materia.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable, PrimaryColumn, Generated } from 'typeorm';

@Entity('estudiantes')
export class Estudiante extends AuditableEntity {
  @PrimaryColumn('char', { length: 36 })
  @Generated('uuid')
  id!: string;

  @Column('int', { unique: true, nullable: false })
  ci!: number;

  @Column('varchar', { length: 50, nullable: false })
  nombres!: string;

  @Column('varchar', { length: 100, nullable: false })
  apellidos!: string;

  @Column('varchar', { length: 20, nullable: false })
  telefono!: string;

  @ManyToMany(() => Materia, materia => materia.estudiantes)
  @JoinTable({ name: 'estudiante_materia' })
  materias!: Materia[];
}
