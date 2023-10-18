import { Module } from '@nestjs/common';
import { RecordsFeedingService } from './records_feeding.service';
import { RecordsFeedingController } from './records_feeding.controller';

@Module({
  controllers: [RecordsFeedingController],
  providers: [RecordsFeedingService],
})
export class RecordsFeedingModule {}
