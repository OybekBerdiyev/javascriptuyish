import { PartialType } from '@nestjs/swagger';
import { CreateRecordsFeedingDto } from './create-records_feeding.dto';

export class UpdateRecordsFeedingDto extends PartialType(CreateRecordsFeedingDto) {}
