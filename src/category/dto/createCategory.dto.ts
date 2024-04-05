import { ApiProperty } from '@nestjs/swagger';
import { Categories } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class CreateCategoryDto implements Categories {
    @Exclude()
    id: string;

    @ApiProperty({
        description: 'Название категории',
        type: 'string',
        required: true,
    })
    name: string;
}
