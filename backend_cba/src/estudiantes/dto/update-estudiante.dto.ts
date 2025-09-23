import { PartialType } from '@nestjs/mapped-types';
import { CreateEstudianteDto } from './create-estudiante.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateEstudianteDto extends PartialType(CreateEstudianteDto) {
    @ApiProperty()
    @IsUUID('4', { message: 'El id debe ser un UUID válido' })
    @IsNotEmpty({ message: 'El id es obligatorio' })
    id!: string;
}
