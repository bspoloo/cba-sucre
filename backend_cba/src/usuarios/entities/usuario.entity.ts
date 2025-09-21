import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Docente } from '../../docentes/entities/docente.entity';
import { AuditableEntity } from '@/config/auditable-entity.class';
import { Role } from '@/roles/entities/role.entity';

@Entity('usuarios')
export class Usuario extends AuditableEntity {
  @PrimaryColumn('char', { length: 36 })
  @Generated('uuid')
  id!: string;

  @Column('varchar', { length: 12, nullable: false })
  name!: string;

  @Column('varchar', { length: 100, nullable: false })
  password!: string; // Cambiado a opcional

  @Column('varchar', { length: 50, nullable: false })
  email!: string;

  @ManyToOne(() => Role, role => role.users)
  role!: Role;

  @OneToOne(() => Docente, (docente) => docente.usuario)
  @JoinColumn()
  docente!: Docente;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    const salt = await bcrypt.genSalt();
    if (this.password) {
      this.password = await bcrypt.hash(this.password, salt);
    }
  }

  async validatePassword(plainPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, this.password);
  }
}