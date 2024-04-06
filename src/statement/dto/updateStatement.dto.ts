import { ApiProperty } from '@nestjs/swagger';
import { Statement } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class UpdateStatementDto implements Statement {
    @Exclude()
    id: string;

    @IsString()
    @ApiProperty({
        description: 'Ссылка на ученика',
        type: 'string',
        default: '5560baef-302a-4e8b-a101-758e45d31fd7',
    })
    userId: string;

    @IsString()
    @ApiProperty({
        description: 'Ссылка на предмет',
        type: 'string',
        default: '5560baef-302a-4e8b-a101-758e45d31fd7',
    })
    lessonId: string;

    @IsNumber()
    @ApiProperty({
        description: 'Номер семестра',
        type: 'number',
        default: 7,
    })
    quater: number;
}
