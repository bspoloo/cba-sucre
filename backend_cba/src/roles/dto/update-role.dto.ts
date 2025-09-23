import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateRoleDto } from './create-role.dto';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
    @ApiProperty()
    @IsUUID('4', { message: 'El id debe ser un UUID válido' })
    @IsNotEmpty({ message: 'El id es obligatorio' })
    id!: string;
}
