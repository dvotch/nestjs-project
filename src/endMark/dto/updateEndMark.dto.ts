import { ApiProperty } from '@nestjs/swagger';
import { EndMark } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { IsDate, IsNumber, IsUUID } from 'class-validator';

export class UpdateEndMarkDto implements EndMark {
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

    userId: string;

    lessonId: string;
}
