import { PartialType } from '@nestjs/mapped-types';
import { CreateDocenteDto } from './create-docente.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateDocenteDto extends PartialType(CreateDocenteDto) {
    @ApiProperty()
    @IsUUID('4', { message: 'El id debe ser un UUID válido' })
    @IsNotEmpty({ message: 'El id es obligatorio' })
    id!: string;
}
