import { ApiProperty } from '@nestjs/swagger';
import { Organizations } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { IsString } from 'class-validator';

export class CreateOrganizations implements Organizations {
    @Exclude()
    id: string;

    @IsString()
    @ApiProperty({
        description: 'Название организации',
        required: true,
        default: 'Пульс жизни ЗМК',
        type: 'string',
    })
    name: string;

    @IsString()
    @ApiProperty({
        description: 'Описание организации',
        required: true,
        default: 'Волонтерское объединение для самых лучших людей.',
        type: 'string',
    })
    description: string;

    @ApiProperty({
        description: 'Логотип организации',
        required: true,
        default: '',
        type: 'buffer',
    })
    logo: Buffer;
}
