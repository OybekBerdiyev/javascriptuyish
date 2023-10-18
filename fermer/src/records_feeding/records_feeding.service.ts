import { Injectable } from '@nestjs/common';
import { CreateRecordsFeedingDto } from './dto/create-records_feeding.dto';
import { UpdateRecordsFeedingDto } from './dto/update-records_feeding.dto';

@Injectable()
export class RecordsFeedingService {
  create(createRecordsFeedingDto: CreateRecordsFeedingDto) {
    return 'This action adds a new recordsFeeding';
  }

  findAll() {
    return `This action returns all recordsFeeding`;
  }

  findOne(id: number) {
    return `This action returns a #${id} recordsFeeding`;
  }

  update(id: number, updateRecordsFeedingDto: UpdateRecordsFeedingDto) {
    return `This action updates a #${id} recordsFeeding`;
  }

  remove(id: number) {
    return `This action removes a #${id} recordsFeeding`;
  }
}
