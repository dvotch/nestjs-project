import { ApiProperty } from '@nestjs/swagger';
import { Marks } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { IsDate, IsNumber, IsUUID } from 'class-validator';

export class CreateMarkDto implements Marks {
    @Exclude()
    id: string;

    @ApiProperty({
        description: 'Дата выставления оценки',
        required: true,
        default: '02-04-2024',
        type: 'date',
    })
    @IsDate()
    date: Date;

    @ApiProperty({
        description: 'Оценка',
        required: true,
        default: '5',
        type: 'number',
    })
    @IsNumber()
    mark: number;

    @ApiProperty({
        description: 'Ссылка на ведомость',
        required: true,
        default: '5560baef-302a-4e8b-a101-758e45d31fd7',
        type: 'string',
    })
    @IsUUID()
    statementId: string;
}
