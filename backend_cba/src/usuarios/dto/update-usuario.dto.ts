import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUsuarioDto } from './create-usuario.dto';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {
    @ApiProperty()
    @IsUUID('4', { message: 'El id debe ser un UUID válido' })
    @IsNotEmpty({ message: 'El id es obligatorio' })
    id!: string;
}
