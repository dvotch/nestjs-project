import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';

import { CreditService } from 'src/credit/credit.service';
import { LessonService } from 'src/lesson/lesson.service';
import { MarkService } from 'src/mark/mark.service';
import { OrganizationsService } from 'src/organizations/organizations.service';
import { PortfolioService } from 'src/portfolio/portfolio.service';
import { StatementService } from 'src/statement/statement.service';
import { PostOrganizationDto } from './dto/postOrganization.dto';
import bufferToDataUrl from 'buffer-to-data-url';

@Injectable()
export class StudentService {
    constructor(
        private readonly lessonService: LessonService,
        private readonly creditService: CreditService,

        private readonly statementService: StatementService,
        private readonly markService: MarkService,
        private readonly portfolioService: PortfolioService,
        private readonly prismaService: PrismaService,
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
        return this.creditService.getByUserId(id);
    }

    async getMyOrganization(id: string) {
        const organizations = await this.prismaService.usersOrganization.findMany({
            where: { userId: id, status: true },
        });
        const returnData = organizations.map(async (elem) => {
            const organization = await this.prismaService.organizations.findUnique({
                where: { id: elem.organizationId },
            });
            return {
                name: organization.name,
                id: elem.id,
                description: organization.description,
                photo: bufferToDataUrl('image/png', organization.logo),
            };
        });
        return Promise.all(returnData);
    }

    async sendApplication(id: string, dto: PostOrganizationDto) {
        return this.prismaService.usersOrganization.create({
            data: {
                userId: id,
                ...dto,
            },
        });
    }
    async getMyPortfolio(userId: string, page: string) {
        return this.portfolioService.getAllById(userId, page);
    }
    async getStudentMarks(userId: string, lessonId: string) {
        const statementId = this.statementService.getByUserIdAndLessonId(userId, lessonId);
        return this.markService.getAllById((await statementId).id);
    }
}
