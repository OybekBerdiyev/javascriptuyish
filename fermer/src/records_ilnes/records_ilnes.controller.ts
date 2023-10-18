import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RecordsIlnesService } from './records_ilnes.service';
import { CreateRecordsIlneDto } from './dto/create-records_ilne.dto';
import { UpdateRecordsIlneDto } from './dto/update-records_ilne.dto';

@Controller('records/ilnes')
export class RecordsIlnesController {
  constructor(private readonly recordsIlnesService: RecordsIlnesService) {}

  @Post()
  create(@Body() createRecordsIlneDto: CreateRecordsIlneDto) {
    return this.recordsIlnesService.create(createRecordsIlneDto);
  }

  @Get()
  findAll() {
    return this.recordsIlnesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recordsIlnesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecordsIlneDto: UpdateRecordsIlneDto) {
    return this.recordsIlnesService.update(id, updateRecordsIlneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recordsIlnesService.remove(id);
  }
}
