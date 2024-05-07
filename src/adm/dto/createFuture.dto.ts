import { ApiProperty } from '@nestjs/swagger';
import { Future } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class CreateFutureDto implements Future {
    @Exclude()
    id: string;

    @ApiProperty({
        description: 'Стоимость / Зарплата',
        default: 1000,
        required: true,
        type: 'number',
    })
    cost: number;

    @ApiProperty({
        description: 'Описание',
        default: 'Информатика и вычислительная техника; управление в технических системах и еще 21 направление',
        required: false,
        type: 'string',
    })
    description: string;

    @ApiProperty({
        description:
            'Санкт-Петербургский государственный электротехнический университет ЛЭТИ им. В.И. Ульянова (Ленина)',
        default: 'test',
        required: true,
        type: 'string',
    })
    name: string;

    @ApiProperty({
        description: 'Номер телефона',
        default: '+79278892193',
        required: true,
        type: 'string',
    })
    phone: string;

    @ApiProperty({
        description: 'Фотография',
        default: '',
        required: false,
        type: 'buffer',
    })
    photo: Buffer;

    @ApiProperty({
        description: 'Место',
        default: 'Санкт-Петербург / государственный',
        required: true,
        type: 'string',
    })
    place: string;

    @ApiProperty({
        description: 'Специальность',
        default: '9b5f0a89-5f4f-4887-aeee-c4404fd12481',
        required: true,
        type: 'string',
    })
    specializationId: string;

    @ApiProperty({
        description: 'http://prod.dvotch.ru:3001/api#/Specialization/getSpecializations',
        default: 'test',
        required: true,
        type: 'string',
    })
    url: string;

    @ApiProperty({
        description: 'Работа или учеба',
        default: 'test',
        required: true,
        type: 'boolean',
    })
    work: boolean;
}
