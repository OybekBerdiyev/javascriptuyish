import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BulderService } from './boulder.service';
import { BuilderController } from './boulder.controller';
import { Bulder } from './models/boulder.model';

@Module({
  imports: [SequelizeModule.forFeature([Bulder])],
  providers: [BulderService],
  controllers: [BuilderController]
})
export class BoulderModule {}
