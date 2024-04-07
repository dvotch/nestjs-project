import { ApiProperty } from '@nestjs/swagger';
import { Future } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
export class UpdateFuture implements Future {
    @Exclude()
    id: string;
    @IsString()
    @ApiProperty({
        description: 'Название организации',
        type: 'string',
        default: 'ЗМК',
        required: false,
    })
    name: string;
    @IsString()
    @ApiProperty({
        description: 'Место',
        type: 'string',
        default: 'Улица Гоголя 45',
        required: false,
    })
    place: string;
    @IsNumber()
    @ApiProperty({
        description: 'Цена',
        type: 'number',
        default: 10_000,
        required: false,
    })
    cost: number;
    @IsString()
    @ApiProperty({
        description: 'Описание',
        type: 'string',
        default: 'Организация работает с...',
        required: false,
    })
    description: string;
    @IsString()
    @ApiProperty({
        description: 'Телефон',
        type: 'string',
        default: '89033457812',
        required: false,
    })
    phone: string;
    @IsString()
    @ApiProperty({
        description: 'Ссылка',
        type: 'string',
        default: 'https..',
        required: false,
    })
    url: string;

    @ApiProperty({
        description: 'Фото',
        type: 'buffer',
        default: '',
        required: false,
    })
    photo: Buffer;
    @IsString()
    @ApiProperty({
        description: 'Айди специальности',
        type: 'string',
        default: '2',
        required: false,
    })
    specializationId: string;
}
