import { Module } from '@nestjs/common';
import { RecordsIlnesService } from './records_ilnes.service';
import { RecordsIlnesController } from './records_ilnes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RecordsIlne, RecordsIlneSchema } from './schemas/records_ilne.schema';
import { Animal, AnimalScheme } from '../animals/schemas/animal.schema';
import { Worker, WorkerScheme } from '../worker/schemas/worker.schema';
import { FilesModule } from '../files/files.module';

@Module({
  imports: [MongooseModule.forFeature([
    {name: RecordsIlne.name, schema: RecordsIlneSchema},
    {name: Animal.name, schema: AnimalScheme},
    {name: Worker.name, schema: WorkerScheme},
  ]),
  FilesModule
  ],
  controllers: [RecordsIlnesController],
  providers: [RecordsIlnesService],
})
export class RecordsIlnesModule {}
