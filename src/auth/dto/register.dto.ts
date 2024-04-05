import { IsPasswordMatchingConstraint } from '@common/decorators';
import { ApiProperty } from '@nestjs/swagger';
import { $Enums, User } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { IsEmail, IsString, MinLength, Validate } from 'class-validator';

export class RegisterDto implements User {
    @Exclude()
    id: string;
    @Exclude()
    createdAt: Date;
    @Exclude()
    organizationId: string;
    @Exclude()
    updatedAt: Date;

    @ApiProperty({
        title: 'Почта пользователя',
        description: 'Почта пользователя',
        default: 'test@test.ru',
        required: true,
        type: 'string',
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        title: 'Пароль пользователя',
        description: 'Пароли должны совпадать',
        default: 'test',
        required: true,
        type: 'string',
    })
    @IsString()
    @MinLength(6)
    password: string;

    @ApiProperty({
        title: 'Повторить пароль для проверки',
        description: 'Пароли должны совпадать',
        default: 'test',
        required: true,
        type: 'string',
    })
    @IsString()
    @MinLength(6)
    @Validate(IsPasswordMatchingConstraint)
    passwordRepeat: string;

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
        description: 'Аватар в бинарном формате',
        type: 'Buffer',
        default: '',
        required: false,
    })
    avatar: Buffer;

    @ApiProperty({
        description: 'Дата зачисления',
        type: 'Date',
        default: '02-02-2024',
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
