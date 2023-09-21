import { Module } from '@nestjs/common';
import { FuelTypeService } from './fuel_type.service';
import { FuelTypeController } from './fuel_type.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { FuelType } from './models/fuelType.model';

@Module({
  imports: [SequelizeModule.forFeature([FuelType])],
  providers: [FuelTypeService],
  controllers: [FuelTypeController]
})
export class FuelTypeModule {}
