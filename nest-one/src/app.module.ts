import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { CompanyModule } from './company/company.module';
import { Company } from './company/models/company.model';
import { BoulderModule } from './boulder/boulder.module';
import { Bulder } from './boulder/models/boulder.model';
import { MachineModule } from './machine/machine.module';
import { Machine } from './machine/models/machine.model';
import { DriverModule } from './driver/driver.module';
import { Driver } from './driver/models/driver.model';
import { MachineDriverModule } from './machine_driver/machine_driver.module';
import { Machine_driver } from './machine_driver/models/md.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres', 
      host: process.env.POSTGES_HOST,
      port: Number(process.env.POSTGES_PORT),
      username: process.env.POSTGES_USER,
      password: String(process.env.POSTGES_PASSWORD),
      database: process.env.POSTGES_DB,
      models: [Company , Bulder , Machine, Driver, Machine_driver],
      autoLoadModels: true,
      logging: true,
    }),
    CompanyModule,
    BoulderModule,
    MachineModule,
    DriverModule,
    MachineDriverModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
