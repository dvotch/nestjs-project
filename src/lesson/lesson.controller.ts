import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { CreateLeessonDto, UpdateLessonDto } from './dto';
import { CurrentUser, Public } from '@common/decorators';
import { ApiTags } from '@nestjs/swagger';
import { JwtPayload } from '@auth/interfaces';

@Public()
@ApiTags('Lesson')
@Controller('lesson')
export class LessonController {
    constructor(private readonly lessonService: LessonService) {}

    @Get()
    getAllLessons() {
        return this.lessonService.getAll();
    }

    @Get('/my')
    getAllMyLessons(@CurrentUser() user: JwtPayload) {
        return this.lessonService.getAllById(user.id);
    }

    @Post()
    createLesson(@Body() dto: CreateLeessonDto) {
        return this.lessonService.create(dto);
    }

    @Delete('/:id')
    deleteLesson(@Param('id') id: string) {
        return this.lessonService.delete(id);
    }

    @Put('/:id')
    updateLesson(@Param('id') id: string, @Body() dto: UpdateLessonDto) {
        return this.lessonService.update(id, dto);
    }
}
