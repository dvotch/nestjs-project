import { IsPasswordMatchingConstraint } from '@common/decorators';
import { ApiProperty } from '@nestjs/swagger';
import { $Enums, User } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { IsArray, IsDate, IsEmail, IsNumber, IsString, MinLength, Validate, isArray } from 'class-validator';

export class RegisterDto implements User {
    @Exclude()
    id: string;
    @Exclude()
    createdAt: Date;
    @Exclude()
    organizationId: string;
    @Exclude()
    updatedAt: Date;

    @IsString()
    @IsEmail()
    @ApiProperty({
        title: 'Почта пользователя',
        description: 'Почта пользователя',
        default: 'test@test.ru',
        required: true,
        type: 'string',
    })
    email: string;

    @IsString()
    @ApiProperty({
        title: 'Пароль пользователя',
        description: 'Пароли должны совпадать',
        default: 'test',
        required: true,
        type: 'string',
    })
    @MinLength(6)
    password: string;

    @IsString()
    @ApiProperty({
        title: 'Повторить пароль для проверки',
        description: 'Пароли должны совпадать',
        default: 'test',
        required: true,
        type: 'string',
    })
    @MinLength(6)
    @Validate(IsPasswordMatchingConstraint)
    passwordRepeat: string;

    @IsString()
    @ApiProperty({
        description: 'Имя',
        type: 'string',
        default: 'Антон',
        required: true,
    })
    name: string;

    @IsString()
    @ApiProperty({
        description: 'Фамилия',
        type: 'Иванов',
        default: 'dev',
        required: true,
    })
    surname: string;

    @IsString()
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

    @IsDate()
    @ApiProperty({
        description: 'Дата зачисления',
        type: 'Date',
        default: '02-02-2024',
        required: true,
    })
    dateOfReceipt: Date;

    @IsNumber()
    @ApiProperty({
        description: 'Номер группы',
        type: 'number',
        default: '205',
        required: true,
    })
    group: number;

    @IsString()
    @ApiProperty({
        description: 'Номер телефона',
        type: 'string',
        default: '89999999999',
        required: true,
    })
    phoneNumber: string;

    @IsArray()
    @ApiProperty({
        description: 'Список ролей',
        type: 'array',
        default: '["STUDENT"]',
        required: true,
    })
    roles: $Enums.Role[];

    @IsString()
    @ApiProperty({
        description: 'Специальность',
        type: 'string',
        default: '1',
        required: true,
    })
    specializationId: string;
}
