import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { StatementModule } from './statement/statement.module';
import { SpecializationsModule } from './specializations/specializations.module';
import { CategoryModule } from './category/category.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { LessonModule } from './lesson/lesson.module';
import { FutureModule } from './future/future.module';

@Module({
    imports: [
        UserModule,
        PrismaModule,
        AuthModule,
        ConfigModule.forRoot({ isGlobal: true }),
        StatementModule,
        SpecializationsModule,
        CategoryModule,
        PortfolioModule,
        OrganizationsModule,
        LessonModule,
        FutureModule,
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        },
    ],
})
export class AppModule {}
