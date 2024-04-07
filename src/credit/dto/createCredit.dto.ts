import { ApiProperty } from '@nestjs/swagger';
import { Credits } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { IsDate, IsString, IsNumber } from 'class-validator';

export class CreateCreditDto implements Credits {
    @Exclude()
    id: string;

    @IsDate()
    @ApiProperty({
        description: 'Дата назначения пересдачи',
        type: 'date',
        default: '2024-04-05T20:16:12.924Z',
        required: true,
    })
    date: Date;

    @IsDate()
    @ApiProperty({
        description: 'Дата последнего дня',
        type: 'date',
        default: '2025-04-05T20:16:12.924Z',
        required: true,
    })
    deadLine: Date;

    @IsString()
    @ApiProperty({
        description: 'Ссылка на предмет для пересдачи',
        type: 'string',
        default: '5560baef-302a-4e8b-a101-758e45d31fd7',
        required: true,
    })
    lessonId: string;

    @IsNumber()
    @ApiProperty({
        description: 'Кабинет пересдачи',
        type: 'number',
        default: 110,
        required: true,
    })
    office: number;

    @IsString()
    @ApiProperty({
        description: 'Ссылка на должника',
        type: 'string',
        default: '5560baef-302a-4e8b-a101-758e45d31fd7',
        required: true,
    })
    userId: string;
}
