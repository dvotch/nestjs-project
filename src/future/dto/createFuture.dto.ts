import { ApiProperty } from '@nestjs/swagger';
import { Future } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class CreateFuture implements Future {
    @Exclude()
    id: string;
    @IsString()
    @ApiProperty({
        description: 'Название организации',
        type: 'string',
        default: 'ЗМК',
        required: true,
    })
    name: string;
    @IsString()
    @ApiProperty({
        description: 'Место',
        type: 'string',
        default: 'Улица Гоголя 45',
        required: true,
    })
    place: string;
    @IsNumber()
    @ApiProperty({
        description: 'Цена',
        type: 'number',
        default: 10_000,
        required: true,
    })
    cost: number;
    @IsString()
    @ApiProperty({
        description: 'Описание',
        type: 'string',
        default: 'Организация работает с...',
        required: true,
    })
    description: string;
    @IsString()
    @ApiProperty({
        description: 'Телефон',
        type: 'string',
        default: '89033457812',
        required: true,
    })
    phone: string;
    @IsString()
    @ApiProperty({
        description: 'Ссылка',
        type: 'string',
        default: 'https..',
        required: true,
    })
    url: string;

    @ApiProperty({
        description: 'Фото',
        type: 'buffer',
        default: '',
        required: true,
    })
    photo: Buffer;
    @IsString()
    @ApiProperty({
        description: 'Айди специальности',
        type: 'string',
        default: '',
        required: true,
    })
    specializationId: string;
}
