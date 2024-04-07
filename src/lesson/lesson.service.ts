import { Injectable } from '@nestjs/common';
import { CreateLeessonDto, UpdateLessonDto } from './dto';
import { PrismaService } from '@prisma/prisma.service';

@Injectable()
export class LessonService {
    constructor(private readonly prismaService: PrismaService) {}

    getAll() {
        return this.prismaService.lessons.findMany();
    }

    create(dto: CreateLeessonDto) {
        return this.prismaService.lessons.create({
            data: { ...dto },
        });
    }

    delete(id: string) {
        return this.prismaService.lessons.delete({
            where: {
                id,
            },
        });
    }

    update(id: string, dto: UpdateLessonDto) {
        return this.prismaService.lessons.update({
            where: { id },
            data: { ...dto },
        });
    }
}
