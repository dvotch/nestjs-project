import { Module } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { PortfolioController } from './portfolio.controller';
import { StudentService } from 'src/student/student.service';

@Module({
    providers: [PortfolioService],
    controllers: [PortfolioController],
    exports: [PortfolioService],
})
export class PortfolioModule {}
