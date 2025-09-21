import { AuditableEntity } from "@/config/auditable-entity.class";
import { Usuario } from "@/usuarios/entities/usuario.entity";
import { IsString, IsUUID } from "class-validator";
import { Column, Entity, Generated, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('roles')
export class Role extends AuditableEntity {
    @PrimaryColumn('char', { length: 36 })
    @Generated('uuid')
    @IsUUID()
    id!: string;

    @Column('varchar', { length: 255, nullable: false })
    @IsString()
    name!: string;

    @Column('varchar', { length: 255, nullable: false })
    @IsString()
    description!: string;

    @OneToMany(() => Usuario, usuario => usuario.role)
    users!: Usuario[];
}
