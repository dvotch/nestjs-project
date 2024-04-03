import { Get, Controller } from '@nestjs/common';

import { LessonService } from './lesson.service';
import { JwtPayload } from '@auth/interfaces';
import { CurrentUser } from '@common/decorators';

@Controller('lesson')
export class LessonController {
    constructor(private readonly lessonService: LessonService) {}

    @Get()
    getLesson(@CurrentUser() user: JwtPayload) {
        return this.lessonService.findLesson(user);
    }
}
