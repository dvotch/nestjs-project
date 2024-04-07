import { ApiProperty } from '@nestjs/swagger';
import { Credits } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class UpdateCreditDto implements Credits {
    @Exclude()
    id: string;

    @IsDate()
    @ApiProperty({
        description: 'Дата назначения пересдачи',
        type: 'date',
        default: '02-02-2024',
        required: false,
    })
    date: Date;

    @IsDate()
    @ApiProperty({
        description: 'Дата последнего дня',
        type: 'date',
        default: '02-02-2025',
        required: false,
    })
    deadLine: Date;

    @IsString()
    @ApiProperty({
        description: 'Ссылка на предмет для пересдачи',
        type: 'string',
        default: '5560baef-302a-4e8b-a101-758e45d31fd7',
        required: false,
    })
    lessonId: string;

    @IsNumber()
    @ApiProperty({
        description: 'Кабинет пересдачи',
        type: 'number',
        default: 110,
        required: false,
    })
    office: number;

    @IsString()
    @ApiProperty({
        description: 'Ссылка на должника',
        type: 'string',
        default: '5560baef-302a-4e8b-a101-758e45d31fd7',
        required: false,
    })
    userId: string;
}
