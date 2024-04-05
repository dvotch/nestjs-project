import { ApiProperty } from '@nestjs/swagger';
import { Portfolio } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class CreatePortfolioDto implements Portfolio {
    @Exclude()
    id: string;

    @ApiProperty({
        description: 'Идентификатор категории',
        type: 'string',
        required: true,
    })
    categoryId: string;

    @ApiProperty({
        description: 'Название документа',
        type: 'string',
        required: true,
    })
    name: string;

    @ApiProperty({
        description: 'Фотография',
        type: 'Buffer',
        required: true,
    })
    photo: Buffer;

    @ApiProperty({
        description: 'Идентификатор владельца',
        type: 'string',
        required: true,
    })
    userId: string;

    @ApiProperty({
        description: 'Год документа',
        type: 'number',
        required: true,
    })
    year: number;
}
