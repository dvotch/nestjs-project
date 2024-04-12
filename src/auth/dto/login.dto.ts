import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
    @ApiProperty({
        description: 'Почта пользователя',
        default: 'test@test3.ru',
        required: true,
        type: 'string',
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'Пароль пользователя',
        default: 'test',
        required: true,
        type: 'string',
    })
    @IsString()
    @MinLength(6)
    password: string;
}
