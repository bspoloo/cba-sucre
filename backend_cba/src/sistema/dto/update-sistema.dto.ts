import { PartialType } from '@nestjs/mapped-types';
import { CreateSistemaDto } from './create-sistema.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateSistemaDto extends PartialType(CreateSistemaDto) {
  @ApiProperty()
  @IsUUID('4', { message: 'El id debe ser un UUID válido' })
  @IsNotEmpty({ message: 'El id es obligatorio' })
  id!: string;
}
