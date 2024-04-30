import { Injectable } from '@nestjs/common';
import { CreateLeessonDto, UpdateLessonDto } from './dto';
import { PrismaService } from '@prisma/prisma.service';

@Injectable()
export class LessonService {
    constructor(private readonly prismaService: PrismaService) {}

    getAll() {
        return this.prismaService.lessons.findMany();
    }
    getMyLessonsGroup(group: number) {
        return this.prismaService.lessons.findMany({
            where: { group: group },
        });
    }
    getAllByUserId(id: string) {
        return this.prismaService.lessons.findMany({
            where: { userId: id },
        });
    }
    getById(id: string) {
        return this.prismaService.lessons.findUnique({
            where: { id },
        });
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
