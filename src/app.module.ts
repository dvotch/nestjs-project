import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { StatementModule } from './statement/statement.module';
import { SpecializationsController } from './specializations/specializations.controller';
import { SpecializationsModule } from './specializations/specializations.module';
import { SpecializationsService } from './specializations/specializations.service';
import { CategoryModule } from './category/category.module';

@Module({
    imports: [
        UserModule,
        PrismaModule,
        AuthModule,
        ConfigModule.forRoot({ isGlobal: true }),
        StatementModule,
        SpecializationsModule,
        CategoryModule,
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        },
    ],
})
export class AppModule {}
