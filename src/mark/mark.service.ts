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

    async create(dto: CreateMarkDto) {
        const mark = await this.prismaService.marks.findFirst({
            where: {
                date: dto.date,
                statementId: dto.statementId,
            },
        });

        if (!mark) {
            return this.prismaService.marks.create({ data: { ...dto } });
        }

        return this.prismaService.marks.update({
            where: { id: mark.id },
            data: {
                mark: dto.mark,
            },
        });
    }
    async getMarkId(day: Date, statementId: string) {
        const mark = await this.prismaService.marks.findFirst({
            where: {
                date: day,
                statementId: statementId,
            },
        });
        return mark.id;
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
    async getAverageMark(userId: string, lessonId: string) {
        const statementId = this.statementService.getByUserIdAndLessonId(userId, lessonId);
        const allMarks = await this.getAllById((await statementId).id);

        const marksAsNumbers = allMarks
            .filter((mark) => mark.mark !== 'Н' && mark.mark !== 'Н/Б')
            .map((mark) => parseInt(mark.mark, 10));
        if (marksAsNumbers.length === 0) {
            return 0;
        }
        const totalMarks = marksAsNumbers.reduce((acc, curr) => acc + curr, 0);
        const averageMark = totalMarks / marksAsNumbers.length;

        return averageMark;
    }
}
