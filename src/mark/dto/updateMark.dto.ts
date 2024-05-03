import { ApiProperty } from '@nestjs/swagger';
import { Marks } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { IsDate, IsNumber, IsUUID } from 'class-validator';

export class UpdateMarkDto implements Marks {
    @Exclude()
    id: string;

    @IsDate()
    @ApiProperty({
        description: 'Дата выставления оценки',
        required: true,
        default: '02-04-2024',
        type: 'date',
    })
    date: Date;

    @IsNumber()
    @ApiProperty({
        description: 'Оценка',
        required: true,
        default: '5',
        type: 'number',
    })
    mark: string;

    @IsUUID()
    @ApiProperty({
        description: 'Ссылка на ведомость',
        required: true,
        default: '5560baef-302a-4e8b-a101-758e45d31fd7',
        type: 'string',
    })
    statementId: string;
}
