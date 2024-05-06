import { JwtPayload } from '@auth/interfaces';
import { convertToSecondsUtil } from '@common/utils';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Role, User } from '@prisma/client';
import { PrismaService } from '@prisma/prisma.service';
import { genSaltSync, hashSync } from 'bcrypt';
import { Cache } from 'cache-manager';
import { CreateUserDto } from './dto/create-user.dto';
import bufferToDataUrl from 'buffer-to-data-url';

@Injectable()
export class UserService {
    constructor(
        private readonly prismaService: PrismaService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private readonly configService: ConfigService,
    ) {}

    save(dto: CreateUserDto) {
        const hashedPassword = this.hashPassword(dto.password);
        return this.prismaService.user.create({
            data: { ...dto, password: hashedPassword },
        });
    }

    async findOne(idOrEmail: string, isReset = false) {
        if (isReset) {
            await this.cacheManager.del(idOrEmail);
        }
        const user = await this.cacheManager.get<User>(idOrEmail);
        if (!user) {
            const user = this.prismaService.user.findFirst({
                where: {
                    OR: [{ id: idOrEmail }, { email: idOrEmail }],
                },
            });

            if (!user) {
                return null;
            }
            await this.cacheManager.set(idOrEmail, user, convertToSecondsUtil(this.configService.get('JWT_EXP')));
            return user;
        }
        return user;
    }

    async delete(id: string, user: JwtPayload) {
        if (user.id !== id && !user.roles.includes(Role.RESOURCES_DEPARTMENT)) {
            throw new ForbiddenException();
        }
        await Promise.all([this.cacheManager.del(id), this.cacheManager.del(user.email)]);
        return this.prismaService.user.delete({
            where: { id },
            select: { id: true },
        });
    }

    private hashPassword(password: string) {
        return hashSync(password, genSaltSync(10));
    }

    getAll() {
        return this.prismaService.user.findMany();
    }

    getAllByGroup(group: number) {
        return this.prismaService.user.findMany({
            where: { group: +group },
            select: {
                id: true,
                name: true,
                surname: true,
            },
        });
    }

    update(id: string, user: Partial<User>) {
        return this.prismaService.user.update({ where: { id }, data: { ...user } });
    }

    async getMyLogo(id: string) {
        const user = await this.prismaService.user.findUnique({
            where: {
                id,
            },
        });
        return bufferToDataUrl('image/png', user.avatar);
    }

    async uploadMyLogo(id: string, avatar: Express.Multer.File) {
        return this.prismaService.user.update({
            where: {
                id,
            },
            data: {
                avatar: avatar.buffer,
            },
        });
    }
}
