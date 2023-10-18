import { Module } from '@nestjs/common';
import { FeedingService } from './feeding.service';
import { FeedingController } from './feeding.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Feeding, FeedingSchema } from './schemas/feeding.schema';
import { Animal, AnimalScheme } from '../animals/schemas/animal.schema';
import { Worker, WorkerScheme } from '../worker/schemas/worker.schema';

@Module({

  imports: [MongooseModule.forFeature([{name: Feeding.name , schema: FeedingSchema},   
    {name: Animal.name, schema: AnimalScheme},
    {name: Worker.name, schema: WorkerScheme},
  ])],
  controllers: [FeedingController],
  providers: [FeedingService],
})
export class FeedingModule {}
 