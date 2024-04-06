import { ApiProperty } from '@nestjs/swagger';
import { Categories } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { IsString } from 'class-validator';

export class CreateCategoryDto implements Categories {
    @Exclude()
    id: string;

    @IsString()
    @ApiProperty({
        description: 'Название категории',
        type: 'string',
        default: 'Волонтерство',
        required: true,
    })
    name: string;
}
