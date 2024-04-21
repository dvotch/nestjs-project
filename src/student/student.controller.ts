import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { StudentService } from './student.service';
import { CurrentUser, Roles } from '@common/decorators';
import { JwtPayload } from '@auth/interfaces';
import { RolesGuard } from '@auth/guards/role.guard';
import { Role } from '@prisma/client';

@ApiTags('Student')
@ApiBearerAuth('JWT-auth')
@Controller('student')
export class StudentController {
    constructor(private readonly studentService: StudentService) {}

    @UseGuards(RolesGuard)
    @Roles(Role.STUDENT)
    @Get('/lessons/:quater')
    getMyLessons(@CurrentUser() user: JwtPayload, @Param('quater') quater: number) {
        return this.studentService.getMyLessons(user.id, quater);
    }

    @UseGuards(RolesGuard)
    @Roles(Role.STUDENT)
    @Get('/marks/:lesson')
    async getStudentMarks(@CurrentUser() user: JwtPayload, @Param('lesson') lessonId: string) {
        return this.studentService.getStudentMarks(user.id, lessonId);
    }

    @UseGuards(RolesGuard)
    @Roles(Role.STUDENT)
    @Get('/credits')
    getMyCredits(@CurrentUser() user: JwtPayload) {
        return this.studentService.getMyCredits(user.id);
    }

    @UseGuards(RolesGuard)
    @Roles(Role.STUDENT)
    @Get('/organization')
    getMyOrganization(@CurrentUser() user: JwtPayload) {
        return this.studentService.getMyOrganization(user.organizationId);
    }

    @UseGuards(RolesGuard)
    @Roles(Role.STUDENT)
    @Get('/portfolio')
    getMyPortfolio(@CurrentUser() user: JwtPayload) {
        return this.studentService.getMyPortfolio(user.id);
    }
}
