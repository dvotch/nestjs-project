import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { CreateCreditDto, UpdateCreditDto } from './dto';
import { JwtPayload } from '@auth/interfaces';
import { Lessons } from '@prisma/client';
import { LessonService } from 'src/lesson/lesson.service';

@Injectable()
export class CreditService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly lessonService: LessonService,
    ) {}

    getAll() {
        return this.prismaService.credits.findMany();
    }

    getByUserId(id: string) {
        return this.prismaService.credits.findMany({
            where: { userId: id },
        });
    }

    getByLessonId(id: string) {
        return this.prismaService.credits.findMany({
            where: { lessonId: id },
        });
    }

    create(dto: CreateCreditDto) {
        return this.prismaService.credits.create({
            data: { ...dto },
        });
    }

    delete(id: string) {
        return this.prismaService.credits.delete({
            where: {
                id,
            },
        });
    }

    update(id: string, dto: UpdateCreditDto) {
        return this.prismaService.credits.update({
            where: { id },
            data: { ...dto },
        });
    }

    async getCreditsForTeacher(id: string) {
        const lessons = await this.lessonService.getAllByUserId(id);
        const credits = [];
        for (const elem of lessons) {
            const creditsForLesson = await this.getByLessonId(elem.id);
            if (creditsForLesson.length !== 0) {
                credits.push(...creditsForLesson);
            }
        }
        return credits;
    }
}
