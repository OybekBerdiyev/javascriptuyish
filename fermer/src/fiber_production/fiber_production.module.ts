import { Module } from '@nestjs/common';
import { FiberProductionService } from './fiber_production.service';
import { FiberProductionController } from './fiber_production.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FiberProduction, FiberProductionSchema } from './schemas/fiber_production.schema';
import { Animal, AnimalScheme } from '../animals/schemas/animal.schema';


@Module({
  imports: [MongooseModule.forFeature([{name: FiberProduction.name, schema: FiberProductionSchema}, {name: Animal.name, schema: AnimalScheme}])],
  controllers: [FiberProductionController],
  providers: [FiberProductionService],
})
export class FiberProductionModule {}
