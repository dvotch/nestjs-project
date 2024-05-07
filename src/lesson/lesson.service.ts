import { Injectable } from '@nestjs/common';
import { CreateLeessonDto, UpdateLessonDto } from './dto';
import { PrismaService } from '@prisma/prisma.service';

@Injectable()
export class LessonService {
    constructor(private readonly prismaService: PrismaService) {}

    getAll() {
        return this.prismaService.lessons.findMany();
    }
    async getMyLessonsGroup(Id: string, group: string) {
        const lessons = await this.prismaService.lessons.findMany({
            where: { userId: Id, group: +group },
        });
        return lessons;
    }
    getAllByUserId(id: string) {
        return this.prismaService.lessons.findMany({
            where: { userId: id },
        });
    }
    async getGroupByUserId(id: string) {
        const abc = await this.prismaService.lessons.findMany({
            where: { userId: id },
        });
        const group = abc.map((lessons) => lessons.group);
        const uniqueGroups = group.filter((value, index, self) => self.indexOf(value) === index);

        return uniqueGroups;
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
