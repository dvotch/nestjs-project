import { Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { LessonModule } from 'src/lesson/lesson.module';
import { UserModule } from '@user/user.module';
import { MarkModule } from 'src/mark/mark.module';
import { StatementModule } from 'src/statement/statement.module';
import { CreditModule } from 'src/credit/credit.module';

@Module({
    providers: [TeacherService],
    controllers: [TeacherController],
    imports: [LessonModule, UserModule, MarkModule, StatementModule, CreditModule],
})
export class TeacherModule {}
