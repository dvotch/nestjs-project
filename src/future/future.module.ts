import { Module } from '@nestjs/common';
import { FutureController } from './future.controller';
import { FutureService } from './future.service';

@Module({
  controllers: [FutureController],
  providers: [FutureService]
})
export class FutureModule {}