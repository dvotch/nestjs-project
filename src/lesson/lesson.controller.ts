import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { CreateLeessonDto, UpdateLessonDto } from './dto';
import { Public } from '@common/decorators';
import { ApiTags } from '@nestjs/swagger';

@Public()
@ApiTags('Lesson')
@Controller('lesson')
export class LessonController {
    constructor(private readonly lessonService: LessonService) {}

    @Get()
    getAllLessons() {
        return this.lessonService.getAll();
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
