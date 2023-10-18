import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RecordsFeedingService } from './records_feeding.service';
import { CreateRecordsFeedingDto } from './dto/create-records_feeding.dto';
import { UpdateRecordsFeedingDto } from './dto/update-records_feeding.dto';

@Controller('records-feeding')
export class RecordsFeedingController {
  constructor(private readonly recordsFeedingService: RecordsFeedingService) {}

  @Post()
  create(@Body() createRecordsFeedingDto: CreateRecordsFeedingDto) {
    return this.recordsFeedingService.create(createRecordsFeedingDto);
  }

  @Get()
  findAll() {
    return this.recordsFeedingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recordsFeedingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecordsFeedingDto: UpdateRecordsFeedingDto) {
    return this.recordsFeedingService.update(+id, updateRecordsFeedingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recordsFeedingService.remove(+id);
  }
}
