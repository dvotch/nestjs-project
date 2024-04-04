import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
    @ApiProperty({
        description: 'Почта пользователя',
        examples: ['dev', 'adm'],
        required: true,
        type: 'string',
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'Пароль пользователя',
        examples: ['dev', 'adm'],
        required: true,
        type: 'string',
    })
    @IsString()
    @MinLength(6)
    password: string;
}
