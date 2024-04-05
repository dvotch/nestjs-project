import { ApiProperty } from '@nestjs/swagger';
import { Categories } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UpdateCategoryDto implements Categories {
    @ApiProperty({
        description: 'Идентификатор для поиска',
        type: 'string',
    })
    @Exclude()
    id: string;

    @ApiProperty({
        description: 'Название категории',
        type: 'string',
        required: true,
    })
    name: string;
}
