import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { LessonModule } from 'src/lesson/lesson.module';
import { UserModule } from '@user/user.module';
import { MarkModule } from 'src/mark/mark.module';
import { StatementModule } from 'src/statement/statement.module';
import { CreditModule } from 'src/credit/credit.module';
import { StudentController } from './student.controller';
import { OrganizationsModule } from 'src/organizations/organizations.module';
import { PortfolioModule } from 'src/portfolio/portfolio.module';

@Module({
    providers: [StudentService],
    controllers: [StudentController],
    imports: [
        LessonModule,
        UserModule,
        MarkModule,
        StatementModule,
        CreditModule,
        OrganizationsModule,
        PortfolioModule,
    ],
})
export class StudentModule {}
