import { ConflictException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto';
import { UserService } from '@user/user.service';
import { Tokens } from './interfaces';
import { compareSync } from 'bcrypt'; // eslint-disable-line
import { Token, User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '@prisma/prisma.service';
import { v4 } from 'uuid';
import { add } from 'date-fns';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly prismaService: PrismaService,
    ) {}

    async registration(dto: RegisterDto) {
        const user: User = await this.userService.findOne(dto.email).catch((error) => {
            this.logger.error(error);
            return null;
        });

        if (user) {
            throw new ConflictException('Пользователь с таким email уже зарегистрирован');
        }

        return this.userService.save(dto).catch((err) => {
            this.logger.error(err);
            return null;
        });
    }
    async login(dto: LoginDto, agent: string): Promise<Tokens> {
        const user: User = await this.userService.findOne(dto.email, true).catch((error) => {
            this.logger.error(error);
            return null;
        });

        if (!user || !compareSync(dto.password, user.password)) {
            throw new UnauthorizedException('Неверный логин или пароль');
        }

        return this.generateTokens(user, agent);
    }

    private async generateTokens(user: User, agent: string): Promise<Tokens> {
        const specialization = await this.prismaService.specializations.findUnique({
            where: {
                id: user.specializationId || '',
            },
        });
        const accessToken =
            'Bearer ' +
            this.jwtService.sign({
                id: user.id,
                email: user.email,
                roles: user.roles,
                specialization: specialization?.name || null,
                group: user.group,
                name: user.name,
                surname: user.surname,
            });

        const refreshToken = await this.getRefreshToken(user.id, agent);

        return { accessToken, refreshToken };
    }

    private async getRefreshToken(userId: string, agent: string): Promise<Token> {
        const _token = await this.prismaService.token.findFirst({
            where: {
                userId,
                userAgent: agent,
            },
        });
        const token = _token?.token ?? '';
        return this.prismaService.token.upsert({
            where: { token },
            update: {
                token: v4(),
                exp: add(new Date(), { hours: 1 }),
            },
            create: {
                token: v4(),
                exp: add(new Date(), { hours: 1 }),
                userId,
                userAgent: agent,
            },
        });
    }

    async refreshTokens(refreshToken: string, agent: string): Promise<Tokens> {
        const token = await this.prismaService.token.findUnique({ where: { token: refreshToken } });
        if (!token) {
            throw new UnauthorizedException();
        }

        await this.prismaService.token.delete({ where: { token: token.userId } });
        if (new Date(token.exp) < new Date()) {
            throw new UnauthorizedException();
        }

        const user = await this.userService.findOne(token.userId);
        return this.generateTokens(user, agent);
    }

    deleteRefreshToken(token: string) {
        return this.prismaService.token.delete({
            where: { token },
        });
    }
}
