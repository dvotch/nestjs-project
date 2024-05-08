import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { CreateEndMarkDto, UpdateEndMarkDto } from './dto';
import { StatementService } from 'src/statement/statement.service';

@Injectable()
export class endMarkService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly statementService: StatementService,
    ) {}

    getAll() {
        return this.prismaService.endMark.findMany();
    }

    async getAllById(userId: string, lessonId: string) {
        const statementId = await this.prismaService.statement.findFirst({
            where: { userId: userId, lessonId: lessonId },
        });
        const adm = await this.prismaService.endMark.findFirst({
            where: { statementId: statementId.id },
        });
        return adm.endMark;
    }

    async create(dto: CreateEndMarkDto) {
        const endMark = await this.prismaService.endMark.findFirst({
            where: {
                statementId: dto.statementId,
            },
        });
        if (dto.endMark === '0') {
            return this.prismaService.endMark.delete({ where: { id: endMark.id } });
        }
        if (!endMark) {
            return this.prismaService.endMark.create({ data: { ...dto } });
        }

        return this.prismaService.endMark.update({
            where: { id: endMark.id },
            data: {
                endMark: dto.endMark,
            },
        });
    }
    // async getMarkId(day: Date, statementId: string) {
    //     const mark = await this.prismaService.marks.findFirst({
    //         where: {
    //             date: day,
    //             statementId: statementId,
    //         },
    //     });
    //     return mark.id;
    // }

    // async update(id: string, dto: UpdateEndMarkDto) {
    //     const mark = this.prismaService.marks.findUnique({
    //         where: {
    //             id,
    //         },
    //     });
    //     if (!mark) {
    //         throw new NotFoundException('Такой записи не существует');
    //     }

    //     return this.prismaService.marks.update({
    //         where: { id },
    //         data: { ...dto },
    //     });
    // }

    // delete(id: string) {
    //     return this.prismaService.marks.delete({ where: { id } });
    // }
}
