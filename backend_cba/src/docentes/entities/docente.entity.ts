import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne, ManyToMany, JoinTable, CreateDateColumn, OneToOne, PrimaryColumn, Generated } from "typeorm";

import { Materia } from '../../materias/entities/materia.entity'; // Adjusted relative path
import { Usuario } from '../../usuarios/entities/usuario.entity';
import { AuditableEntity } from "@/config/auditable-entity.class";

@Entity('docentes')
export class Docente extends AuditableEntity {
  @PrimaryColumn('char', { length: 36 })
  @Generated('uuid')
  id!: string;

  @Column('int', { nullable: false })
  ci!: number;

  @Column('varchar', { length: 50, nullable: false })
  nombres!: string;

  @Column('varchar', { length: 50, nullable: false })
  apellidos!: string;

  @Column('int', { nullable: false })
  telefono!: number;

  @Column('varchar', { length: 100, nullable: false })
  direccion!: string;

  @ManyToOne(() => Materia, materia => materia.docentes)
  materia!: Materia;

  @OneToOne(() => Usuario, (usuario) => usuario.docente)
  @JoinColumn({ name: 'id_usuario' })
  usuario!: Usuario;
}


