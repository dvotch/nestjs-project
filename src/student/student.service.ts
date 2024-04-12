import { Injectable } from '@nestjs/common';

import { CreditService } from 'src/credit/credit.service';
import { LessonService } from 'src/lesson/lesson.service';
import { MarkService } from 'src/mark/mark.service';
import { OrganizationsService } from 'src/organizations/organizations.service';
import { PortfolioService } from 'src/portfolio/portfolio.service';
import { StatementService } from 'src/statement/statement.service';

@Injectable()
export class StudentService {
    constructor(
        private readonly lessonService: LessonService,
        private readonly creditService: CreditService,

        private readonly statementService: StatementService,
        private readonly markService: MarkService,
        private readonly organizationsService: OrganizationsService,
        private readonly portfolioService: PortfolioService,
    ) {}

    async getMyLessons(id: string, quater: number) {
        let statementByUserId = await this.statementService.getAllById(id);

        const lessons = [];
        statementByUserId = statementByUserId.filter((elem) => +elem.quater === +quater);

        for (const elem of statementByUserId) {
            const lesson = await this.lessonService.getById(elem.lessonId);

            lessons.push(lesson);
        }

        return lessons;
    }

    async getMyCredits(id: string) {
        const lessons = await this.lessonService.getAllByUserId(id);
        const credits = [];
        for (const elem of lessons) {
            const creditsForLesson = await this.creditService.getByLessonId(elem.id);

            if (creditsForLesson.length !== 0) {
                credits.push(...creditsForLesson);
            }
        }
        return credits;
    }

    async getMyOrganization(id: string) {
        return this.organizationsService.getAllByUserId(id);
    }
    async getMyPortfolio(userId: string) {
        return this.portfolioService.getAllById(userId);
    }
    async getStudentMarks(userId: string, lessonId: string) {
        const statementId = this.statementService.getByUserIdAndLessonId(userId, lessonId);

        return this.markService.getAllById((await statementId).id);
    }
}
