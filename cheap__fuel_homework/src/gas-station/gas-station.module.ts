import { Module } from '@nestjs/common';
import { MainStationService } from './gas-station.service';
import { GasStationController } from './gas-station.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { MainStation } from './models/gas-station.model';

@Module({
  imports: [SequelizeModule.forFeature([MainStation])],
  providers: [MainStationService],
  controllers: [GasStationController]
})
export class GasStationModule {}
