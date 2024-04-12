import { JwtPayload } from '@auth/interfaces';
import { CurrentUser, Public } from '@common/decorators';
import { Controller, Get, Param } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Teacher')
@Controller('teacher')
@ApiBearerAuth('JWT-auth')
export class TeacherController {
    constructor(private readonly teacherService: TeacherService) {}

    @Get('/lessons')
    getMyLessons(@CurrentUser() user: JwtPayload) {
        return this.teacherService.getMyLessons(user.id);
    }

    @Get('/users/:group')
    getStudentsInGroup(@Param('group') group: number) {
        return this.teacherService.getAllUsersInGroup(group);
    }

    @Get('/marks/:lesson/:user')
    async getStudentMarks(@Param('user') userId: string, @Param('lesson') lessonId: string) {
        return this.teacherService.getStudentMarks(userId, lessonId);
    }

    @Get('/credits')
    getMyCredits(@CurrentUser() user: JwtPayload) {
        return this.teacherService.getMyCredits(user.id);
    }
}
