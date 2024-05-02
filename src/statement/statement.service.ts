import { JwtPayload } from '@auth/interfaces';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { CreateStatementDto, UpdateStatementDto } from './dto';

@Injectable()
export class StatementService {
    constructor(private readonly prismaService: PrismaService) {}

    getAll() {
        return this.prismaService.statement.findMany();
    }

    getAllById(id: string) {
        return this.prismaService.statement.findMany({ where: { userId: id } });
    }
    async getAllUsersByLesson(lessonId: string) {
        const users = await this.prismaService.statement.findMany({
            where: { lessonId: lessonId },
        });
        return users;
    }
    async getAllStatementByLesson(lessonId: string, userId: string) {
        const users = await this.prismaService.statement.findMany({
            where: { lessonId: lessonId, userId: userId },
        });
        const userIds = users.map((user) => user.id);
        return userIds;
    }

    getByUserIdAndLessonId(userId: string, lessonId: string) {
        return this.prismaService.statement.findFirst({
            where: {
                userId: userId,
                lessonId: lessonId,
            },
        });
    }

    create(dto: CreateStatementDto) {
        return this.prismaService.statement.create({ data: { ...dto } });
    }

    update(id: string, dto: UpdateStatementDto) {
        const statement = this.prismaService.statement.findUnique({
            where: {
                id,
            },
        });
        if (!statement) {
            throw new NotFoundException('Такой записи не существует');
        }

        return this.prismaService.marks.update({
            where: { id },
            data: { ...dto },
        });
    }

    delete(id: string) {
        return this.prismaService.statement.delete({ where: { id } });
    }
}
