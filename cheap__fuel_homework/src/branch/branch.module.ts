import { Module } from '@nestjs/common';
import { BranchService } from './branch.service';
import { BranchController } from './branch.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Branch } from './models/branch.model';

@Module({
  imports: [SequelizeModule.forFeature([Branch])],
  providers: [BranchService],
  controllers: [BranchController]
})
export class BranchModule {}
