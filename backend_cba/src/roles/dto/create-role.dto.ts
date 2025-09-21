import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateRoleDto {
    @ApiProperty({
        description: 'Nombre del rol',
        example: 'admin',
    })
    @IsString()
    @IsNotEmpty()
    name!: string;

    @ApiProperty({
        description: 'Descripción del rol',
        example: 'Rol con permisos de administrador',
    })
    @IsString()
    @IsNotEmpty()
    description!: string;
}
