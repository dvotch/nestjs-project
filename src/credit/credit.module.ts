import { Module } from '@nestjs/common';
import { CreditService } from './credit.service';
import { CreditController } from './credit.controller';
import { LessonModule } from 'src/lesson/lesson.module';

@Module({
    providers: [CreditService],
    controllers: [CreditController],
    exports: [CreditService],
    imports: [LessonModule],
})
export class CreditModule {}
