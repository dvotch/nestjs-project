import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';

import { CreditService } from 'src/credit/credit.service';
import { LessonService } from 'src/lesson/lesson.service';
import { MarkService } from 'src/mark/mark.service';
import { OrganizationsService } from 'src/organizations/organizations.service';
import { PortfolioService } from 'src/portfolio/portfolio.service';
import { StatementService } from 'src/statement/statement.service';
import { PostOrganizationDto } from './dto/postOrganization.dto';
import bufferToDataUrl from 'buffer-to-data-url';
import { isNumber } from 'class-validator';

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

    getLessonById(id: string) {
        return this.prismaService.lessons.findUnique({ where: { id } });
    }

    getTeacherById(id: string) {
        return this.prismaService.user.findUnique({
            where: { id },
            select: {
                avatar: false,
                password: false,
                createdAt: false,
                dateOfReceipt: false,
                updatedAt: false,
                token: false,
                name: true,
                surname: true,
                patronymic: true,
                email: true,
                phoneNumber: true,
            },
        });
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

    async getAverageMark(userId: string, lessonId: string) {
        function isNumeric(n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        }
        const statementId = await this.statementService.getByUserIdAndLessonId(userId, lessonId);
        const marks = await this.markService.getAllById(statementId.id);
        const filtered = marks.filter((elem) => {
            const isNum = isNumeric(elem.mark);
            console.log(isNum);
            return isNum;
        });
        return filtered.reduce((acc, elem) => acc + +elem.mark, 0) / filtered.length;
    }

    async leaveFromOrganization(id: string, myId: string) {
        const userOrganization = await this.prismaService.usersOrganization.findFirstOrThrow({
            where: { id, userId: myId },
        });
        if (!userOrganization) throw new NotFoundException('Запись не найдена');
        return this.prismaService.usersOrganization.delete({ where: { id } });
    }

    async getMyFuture(id: string) {
        const user = await this.prismaService.user.findUnique({ where: { id } });
        const features = await this.prismaService.future.findMany({
            where: { specializationId: user.specializationId },
        });

        const works = [];
        const learns = [];
        features.forEach((elem) => {
            const { work } = elem;
            delete elem.work;
            delete elem.specializationId;
            const photo = elem.photo !== null ? elem.photo : Buffer.from('');
            work ? works.push(elem) : learns.push({ ...elem, photo: bufferToDataUrl('image/png', photo) });
        });

        return { works, learns };
    }

    async getAvailableOrganizations(id: string) {
        const already = await this.prismaService.usersOrganization.findMany({
            where: { userId: id },
        });
        const organizations = await this.prismaService.organizations.findMany({ select: { id: true, name: true } });
        const res = organizations.filter((x) => !already.some((y) => x.id === y.organizationId));
        return res;
    }
}
