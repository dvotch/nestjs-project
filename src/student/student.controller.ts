import { Controller, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { StudentService } from './student.service';
import { CurrentUser } from '@common/decorators';
import { JwtPayload } from '@auth/interfaces';

@ApiTags('Student')
@ApiBearerAuth('JWT-auth')
@Controller('student')
export class StudentController {
    constructor(private readonly studentService: StudentService) {}

    @Get('/lessons/:quater')
    getMyLessons(@CurrentUser() user: JwtPayload, @Param('quater') quater: number) {
        return this.studentService.getMyLessons(user.id, quater);
    }

    @Get('/marks/:lesson/:user')
    async getStudentMarks(@Param('user') userId: string, @Param('lesson') lessonId: string) {
        return this.studentService.getStudentMarks(userId, lessonId);
    }

    @Get('/credits')
    getMyCredits(@CurrentUser() user: JwtPayload) {
        return this.studentService.getMyCredits(user.id);
    }
    @Get('/organization')
    getMyOrganization(@CurrentUser() user: JwtPayload) {
        return this.studentService.getMyOrganization(user.organizationId);
    }
    @Get('/portfolio')
    getMyPortfolio(@CurrentUser() user: JwtPayload) {
        return this.studentService.getMyPortfolio(user.id);
    }
}
