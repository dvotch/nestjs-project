import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { CreateMarkDto, UpdateMarkDto } from './dto';

@Injectable()
export class MarkService {
    constructor(private readonly prismaService: PrismaService) {}

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
            data: { ...dto, date: new Date(dto.date) },
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

        const date = dto.date ? new Date(dto.date) : (await mark).date;

        return this.prismaService.marks.update({
            where: { id },
            data: { ...dto, date },
        });
    }

    delete(id: string) {
        return this.prismaService.marks.delete({ where: { id } });
    }
}
