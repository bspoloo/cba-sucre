import { PartialType } from '@nestjs/mapped-types';
import { CreateExperienciaDto } from './create-experiencia.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateExperienciaDto extends PartialType(CreateExperienciaDto) {
    @ApiProperty()
    id!: string
}
