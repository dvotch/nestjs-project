import { Module } from '@nestjs/common';
import { MarkService } from './mark.service';
import { MarkController } from './mark.controller';

@Module({
    providers: [MarkService],
    controllers: [MarkController],
    exports: [MarkService],
})
export class MarkModule {}
