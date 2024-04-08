import { Module } from '@nestjs/common';
import { StatementService } from './statement.service';
import { StatementController } from './statement.controller';

@Module({
    providers: [StatementService],
    controllers: [StatementController],
    exports: [StatementService],
})
export class StatementModule {}
