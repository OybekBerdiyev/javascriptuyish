import { PartialType } from '@nestjs/swagger';
import { CreateRecordsIlneDto } from './create-records_ilne.dto';

export class UpdateRecordsIlneDto extends PartialType(CreateRecordsIlneDto) {}
