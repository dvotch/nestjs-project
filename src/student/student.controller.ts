import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { StudentService } from './student.service';
import { CurrentUser, Roles } from '@common/decorators';
import { JwtPayload } from '@auth/interfaces';
import { RolesGuard } from '@auth/guards/role.guard';
import { Role } from '@prisma/client';
import { PostOrganizationDto } from './dto/postOrganization.dto';

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
        return this.studentService.getMyOrganization(user.id);
    }

    @UseGuards(RolesGuard)
    @Roles(Role.STUDENT)
    @Post('/organization')
    sendApplication(@CurrentUser() user: JwtPayload, @Body() dto: PostOrganizationDto) {
        return this.studentService.sendApplication(user.id, dto);
    }

    @UseGuards(RolesGuard)
    @Roles(Role.STUDENT)
    @Get('/portfolio')
    getMyPortfolio(@CurrentUser() user: JwtPayload, @Query('page') page: string) {
        return this.studentService.getMyPortfolio(user.id, page);
    }
}
