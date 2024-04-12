import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { CreateMarkDto, UpdateMarkDto } from './dto';
import { StatementService } from 'src/statement/statement.service';

@Injectable()
export class MarkService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly statementService: StatementService,
    ) {}

    getAll() {
        return this.prismaService.marks.findMany();
    }

    getAllById(id: string) {
        return this.prismaService.marks.findMany({
            where: { statementId: id },
        });
    }

    create(dto: CreateMarkDto) {
        return this.prismaService.marks.create({
            data: { ...dto },
        });
    }

    async update(id: string, dto: UpdateMarkDto) {
        const mark = this.prismaService.marks.findUnique({
            where: {
                id,
            },
        });
        if (!mark) {
            throw new NotFoundException('Такой записи не существует');
        }

        return this.prismaService.marks.update({
            where: { id },
            data: { ...dto },
        });
    }

    delete(id: string) {
        return this.prismaService.marks.delete({ where: { id } });
    }

    async getStudentMarks(userId: string, lessonId: string) {
        const statementId = this.statementService.getByUserIdAndLessonId(userId, lessonId);

        return this.getAllById((await statementId).id);
    }
}
