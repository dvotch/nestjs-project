import { ApiProperty } from '@nestjs/swagger';
import { Specializations } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { IsString } from 'class-validator';

export class UpdateSpecializationDto implements Specializations {
    @Exclude()
    id: string;

    @IsString()
    @ApiProperty({
        description: 'Названание специальности',
        type: 'string',
        default: '09.02.07 Программирвоание в компьютерных системах.',
        required: true,
    })
    name: string;

    @IsString()
    @ApiProperty({
        description: 'Описание',
        type: 'string',
        default: '4 курса. Обучение программистов.',
        required: true,
    })
    description: string;
}
