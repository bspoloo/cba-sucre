import { PartialType } from '@nestjs/mapped-types';
import { CreateSistemaDto } from './create-sistema.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateSistemaDto extends PartialType(CreateSistemaDto) {
  @ApiProperty()
  id!: string;
}
