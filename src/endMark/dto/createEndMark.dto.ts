import { ApiProperty } from '@nestjs/swagger';
import { EndMark } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { IsDate, IsNumber, IsUUID } from 'class-validator';

export class CreateEndMarkDto implements EndMark {
    @Exclude()
    id: string;

    @IsNumber()
    @ApiProperty({
        description: 'Оценка',
        required: true,
        default: '5',
        type: 'string',
    })
    endMark: string;

    @IsUUID()
    @ApiProperty({
        description: 'Ссылка на ведомость',
        required: true,
        default: '5560baef-302a-4e8b-a101-758e45d31fd7',
        type: 'string',
    })
    statementId: string;
}
