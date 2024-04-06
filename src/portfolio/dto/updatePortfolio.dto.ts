import { ApiProperty } from '@nestjs/swagger';
import { Portfolio } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class UpdatePortfolioDto implements Portfolio {
    @Exclude()
    id: string;

    @IsString()
    @ApiProperty({
        description: 'Идентификатор категории',
        type: 'string',
        required: true,
        default: '5560baef-302a-4e8b-a101-758e45d31fd7',
    })
    categoryId: string;

    @IsString()
    @ApiProperty({
        description: 'Название документа',
        type: 'string',
        default: 'Благодарственное письмо от приюта',
        required: true,
    })
    name: string;

    @ApiProperty({
        description: 'Фотография',
        type: 'buffer',
        default: '',
        required: true,
    })
    photo: Buffer;

    @IsString()
    @ApiProperty({
        description: 'Идентификатор владельца',
        type: 'string',
        default: '5560baef-302a-4e8b-a101-758e45d31fd7',
        required: true,
    })
    userId: string;

    @IsNumber()
    @ApiProperty({
        description: 'Год документа',
        type: 'number',
        default: 2024,
        required: true,
    })
    year: number;
}
