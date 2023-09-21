import { Module } from '@nestjs/common';
import { StationFuelController } from './station_fuel.controller';

@Module({
  controllers: [StationFuelController]
})
export class StationFuelModule {}
