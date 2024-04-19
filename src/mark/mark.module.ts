import { Module } from '@nestjs/common';
import { MarkService } from './mark.service';
import { MarkController } from './mark.controller';
import { StatementModule } from 'src/statement/statement.module';

@Module({
    providers: [MarkService],
    controllers: [MarkController],
    exports: [MarkService],
    imports: [StatementModule],
})
export class MarkModule {}
