import { Module } from '@nestjs/common';
import { DriverService } from './driver.service';
import { DriverController } from './driver.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Driver } from './models/driver.model';

@Module({
  imports: [SequelizeModule.forFeature([Driver])],
  providers: [DriverService],
  controllers: [DriverController]
})
export class DriverModule {}
