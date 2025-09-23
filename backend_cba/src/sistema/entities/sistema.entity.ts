import { AuditableEntity } from "@/config/auditable-entity.class";
import { Column, Entity, Generated, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Sistema extends AuditableEntity{
  @PrimaryColumn('char', { length: 36 })
  @Generated('uuid')
  id!: string;

  @Column('varchar', { length: 50, nullable: false })
  username!: string;

  @Column('varchar', { length: 50, nullable: false })
  password!: string;

  @Column('enum', { enum: ['docente', 'estudiante'], nullable: false })
  tipo!: 'docente' | 'estudiante';
}
