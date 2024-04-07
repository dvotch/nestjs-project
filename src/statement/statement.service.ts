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

    getAllById(user: JwtPayload) {
        return this.prismaService.statement.findMany({ where: { userId: user.id } });
    }

    getByUserIdAndLessonId(userId: string, lessonId: string) {
        return this.prismaService.statement.findUniqueOrThrow({
            where: {
                userId_lessonId: {
                    userId,
                    lessonId,
                },
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
