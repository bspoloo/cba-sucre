import { PartialType } from '@nestjs/mapped-types';
import { CreateExperienciaDto } from './create-experiencia.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateExperienciaDto extends PartialType(CreateExperienciaDto) {
    @ApiProperty()
    @IsUUID('4', { message: 'El id debe ser un UUID válido' })
    @IsNotEmpty({ message: 'El id es obligatorio' })
    id!: string
}
