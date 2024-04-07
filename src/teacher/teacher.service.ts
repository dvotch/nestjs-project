import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { UserService } from '@user/user.service';
import { CreditService } from 'src/credit/credit.service';
import { LessonService } from 'src/lesson/lesson.service';
import { MarkService } from 'src/mark/mark.service';
import { StatementService } from 'src/statement/statement.service';

@Injectable()
export class TeacherService {
    constructor(
        private readonly lessonService: LessonService,
        private readonly creditService: CreditService,
        private readonly userService: UserService,
        private readonly statementService: StatementService,
        private readonly markService: MarkService,
    ) {}

    getMyLessons(id: string) {
        return this.lessonService.getAllByUserId(id);
    }

    async getMyCredits(id: string) {
        const lessons = await this.lessonService.getAllByUserId(id);
        const credits = [];
        for (const elem of lessons) {
            const creditsForLesson = await this.creditService.getByLessonId(elem.id);
            console.log(creditsForLesson);
            if (creditsForLesson.length !== 0) {
                credits.push(...creditsForLesson);
            }
        }
        return credits;
    }

    getAllUsersInGroup(group: number) {
        return this.userService.getAllByGroup(group);
    }

    async getStudentMarks(userId: string, lessonId: string) {
        const statementId = this.statementService.getByUserIdAndLessonId(userId, lessonId);

        return this.markService.getAllById((await statementId).id);
    }
}
