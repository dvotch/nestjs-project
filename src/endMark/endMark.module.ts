import { Module } from '@nestjs/common';
import { endMarkService } from './mark.service';
import { endMarkController } from './mark.controller';
import { StatementModule } from 'src/statement/statement.module';

@Module({
    providers: [endMarkService],
    controllers: [endMarkController],
    exports: [endMarkService],
    imports: [StatementModule],
})
export class endMarkModule {}
