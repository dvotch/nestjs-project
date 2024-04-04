import { IsPasswordMatchingConstraint } from '@common/decorators';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, Validate } from 'class-validator';

export class RegisterDto {
    @ApiProperty({
        title: 'Почта пользователя',
        description: 'Почта пользователя',
        examples: ['dev', 'adm'],
        required: true,
        type: 'string',
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        title: 'Пароль пользователя',
        description: 'Пароли должны совпадать',
        examples: ['dev', 'adm'],
        required: true,
        type: 'string',
    })
    @IsString()
    @MinLength(6)
    password: string;

    @ApiProperty({
        title: 'Повторить пароль для проверки',
        description: 'Пароли должны совпадать',
        examples: ['dev', 'adm'],
        required: true,
        type: 'string',
    })
    @IsString()
    @MinLength(6)
    @Validate(IsPasswordMatchingConstraint)
    passwordRepeat: string;
}
