import { ApiProperty } from '@nestjs/swagger';
import { Lessons } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { IsString, IsNumber } from 'class-validator';

export class UpdateLessonDto implements Partial<Lessons> {
    @Exclude()
    id: string;

    @IsString()
    @ApiProperty({
        description: 'Название предмета',
        type: 'string',
        default: 'МДК 03.01',
        required: true,
    })
    name?: string;

    @IsNumber()
    @ApiProperty({
        description: 'Номер группы',
        type: 'number',
        default: 205,
        required: true,
    })
    group?: number;

    @IsString()
    @ApiProperty({
        description: 'Cсылка на преподавателя',
        type: 'string',
        default: '5560baef-302a-4e8b-a101-758e45d31fd7',
        required: true,
    })
    userId?: string;
}
