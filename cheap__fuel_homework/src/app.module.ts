import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { GasStationModule } from './gas-station/gas-station.module';
import { MainStation } from './gas-station/models/gas-station.model';
import { BranchModule } from './branch/branch.module';
import { Branch } from './branch/models/branch.model';
import { FuelTypeModule } from './fuel_type/fuel_type.module';
import { FuelType } from './fuel_type/models/fuelType.model';
import { StationFuilModule } from './station_fuil/station_fuil.module';
import { StationFuelService } from './station_fuel/station_fuel.service';
import { StationFuilService } from './station_fuil/station_fuil.service';
import { StationFuelModule } from './station_fuel/station_fuel.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    SequelizeModule.forRootAsync({
      useFactory: () => ({
        dialect: 'postgres',
        host: process.env.POSTGES_HOST,
        port: parseInt(process.env.POSTGES_PORT, 10),
        username: process.env.POSTGES_USER,
        password: String(process.env.POSTGES_PASSWORD),
        database: process.env.POSTGES_DB,
        models: [MainStation, Branch, FuelType],
        autoLoadModels: true,
        logging: false,
      }),
    }),
    GasStationModule,
    BranchModule,
    FuelTypeModule,
    StationFuilModule,
    StationFuelModule,
  ],
  controllers: [],
  providers: [StationFuelService, StationFuilService],
})
export class AppModule {}
