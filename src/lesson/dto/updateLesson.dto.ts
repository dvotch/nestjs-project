import { ApiProperty } from '@nestjs/swagger';
import { Lessons } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { IsString, IsNumber, IsDate } from 'class-validator';

export class UpdateLessonDto implements Lessons {
    @Exclude()
    id: string;

    @IsString()
    @ApiProperty({
        description: 'Название предмета',
        type: 'string',
        default: 'МДК 03.01',
        required: false,
    })
    name: string;

    @IsNumber()
    @ApiProperty({
        description: 'Номер группы',
        type: 'number',
        default: 205,
        required: true,
    })
    group: number;

    @IsString()
    @ApiProperty({
        description: 'Cсылка на преподавателя',
        type: 'string',
        default: '5560baef-302a-4e8b-a101-758e45d31fd7',
        required: false,
    })
    userId: string;

    @IsDate()
    @ApiProperty({
        description: 'Дата начала',
        type: 'date',
        default: '2025-04-05T20:16:12.924Z',
        required: false,
    })
    dateStart: Date;

    @IsDate()
    @ApiProperty({
        description: 'Дата конца',
        type: 'date',
        default: '2025-09-05T20:16:12.924Z',
        required: false,
    })
    dateEnd: Date;
}
