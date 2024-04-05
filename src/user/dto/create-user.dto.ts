import { ApiProperty } from '@nestjs/swagger';
import { $Enums, User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class CreateUserDto implements User {
    @Exclude()
    id: string;
    @Exclude()
    createdAt: Date;
    @Exclude()
    organizationId: string;
    @Exclude()
    updatedAt: Date;

    @ApiProperty({
        description: 'Имя',
        type: 'string',
        default: 'Антон',
        required: true,
    })
    name: string;
    @ApiProperty({
        description: 'Фамилия',
        type: 'Иванов',
        default: 'dev',
        required: true,
    })
    surname: string;
    @ApiProperty({
        description: 'Отчество',
        type: 'Иванович',
        default: 'dev',
        required: false,
    })
    patronymic: string;

    @ApiProperty({
        description: 'Почта пользователя',
        type: 'string',
        default: 'test@test.ru',
        required: true,
    })
    email: string;
    @ApiProperty({
        description: 'Пароль пользователя',
        type: 'string',
        default: 'test',
        required: true,
    })
    password: string;

    @ApiProperty({
        description: 'Аватар в бинарном формате',
        type: 'Buffer',
        default: '',
        required: false,
    })
    avatar: Buffer;

    @ApiProperty({
        description: 'Дата зачисления',
        type: 'Date',
        default: '2018–10–26T21:32:52',
        required: true,
    })
    dateOfReceipt: Date;

    @ApiProperty({
        description: 'Номер группы',
        type: 'number',
        default: '205',
        required: true,
    })
    group: number;

    @ApiProperty({
        description: 'Номер телефона',
        type: 'string',
        default: '89999999999',
        required: true,
    })
    phoneNumber: string;

    @ApiProperty({
        description: 'Список ролей',
        type: 'array',
        default: '["STUDENT"]',
        required: true,
    })
    roles: $Enums.Role[];

    @ApiProperty({
        description: 'Специальность',
        type: 'string',
        default: '1',
        required: true,
    })
    specializationId: string;
}
