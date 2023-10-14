import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminScheme } from './schemas/admin.schema';
import { JwtModule } from '@nestjs/jwt';
import { TokensModule } from '../tokens/tokens.module';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Admin.name, schema: AdminScheme}]),
    JwtModule.register({}),
    TokensModule
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
