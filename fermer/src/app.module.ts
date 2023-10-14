import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from './admin/admin.module';
import { SpecialModule } from './special/special.module';
import { WorkerModule } from './worker/worker.module';
import { BlocksModule } from './blocks/blocks.module';
import { BlockWorkerModule } from './block_worker/block_worker.module';
import { AnimalTypeModule } from './animal_type/animal_type.module';
import { AnimalsModule } from './animals/animals.module';
import { VaccineModule } from './vaccine/vaccine.module';

@Module({
  imports: [
  ConfigModule.forRoot({envFilePath: '.env', isGlobal: true}),
  MongooseModule.forRoot(process.env.MONGO_URL),
  AdminModule,
  SpecialModule,
  WorkerModule,
  BlocksModule,
  BlockWorkerModule,
  AnimalTypeModule,
  AnimalsModule,
  VaccineModule
],
  controllers: [],
  providers: [],
})
export class AppModule {}
