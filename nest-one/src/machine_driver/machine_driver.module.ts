import { Module } from '@nestjs/common';
import { MachineDriverService } from './machine_driver.service';
import { MachineDriverController } from './machine_driver.controller';
import { Machine_driver } from './models/md.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Machine_driver])],
  providers: [MachineDriverService],
  controllers: [MachineDriverController]
})
export class MachineDriverModule {}
