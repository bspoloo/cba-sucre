import { AuditableEntity } from '@/config/auditable-entity.class';
import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, Generated } from 'typeorm';

@Entity('experiencias')
export class Experiencia extends AuditableEntity {
  @PrimaryColumn('char', { length: 36 })
  @Generated('uuid')
  id!: string;

  @Column('varchar', { length: 100, nullable: false })
  titulo!: string;

  @Column('varchar', { length: 100, nullable: false })
  descripcion!: string;

  @Column('text')
  url_image!: string;

  @Column('date', { name: 'fecha' })
  fecha!: Date;
}
