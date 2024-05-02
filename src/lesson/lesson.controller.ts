import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { CreateLeessonDto, UpdateLessonDto } from './dto';
import { CurrentUser, Roles } from '@common/decorators';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from '@auth/guards/role.guard';
import { Role } from '@prisma/client';
import { JwtPayload } from '@auth/interfaces';

@ApiTags('Lesson')
@ApiBearerAuth('JWT-auth')
@Controller('lesson')
export class LessonController {
    constructor(private readonly lessonService: LessonService) {}

    @UseGuards(RolesGuard)
    @Roles(Role.TEACHER)
    @Get('/teacher')
    getCurrentLessons(@CurrentUser() user: JwtPayload) {
        return this.lessonService.getAllByUserId(user.id);
    }

    @UseGuards(RolesGuard)
    @Roles(Role.TEACHER)
    @Get('/teacher/:group')
    getMyLessonsGroup(@CurrentUser() user: JwtPayload, @Param('group') group: number) {
        return this.lessonService.getMyLessonsGroup(user.id, group);
    }

    @UseGuards(RolesGuard)
    @Roles(Role.RESOURCES_DEPARTMENT)
    @Get()
    getTeacherLessons() {
        return this.lessonService.getAll();
    }

    @UseGuards(RolesGuard)
    @Roles(Role.RESOURCES_DEPARTMENT)
    @Post()
    createLesson(@Body() dto: CreateLeessonDto) {
        return this.lessonService.create(dto);
    }

    @UseGuards(RolesGuard)
    @Roles(Role.RESOURCES_DEPARTMENT)
    @Delete('/:id')
    deleteLesson(@Param('id') id: string) {
        return this.lessonService.delete(id);
    }

    @UseGuards(RolesGuard)
    @Roles(Role.RESOURCES_DEPARTMENT)
    @Put('/:id')
    updateLesson(@Param('id') id: string, @Body() dto: UpdateLessonDto) {
        return this.lessonService.update(id, dto);
    }
}
