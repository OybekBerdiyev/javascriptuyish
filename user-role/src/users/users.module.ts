import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { Role } from '../roles/models/role.model';
import { UserRoles } from '../roles/models/user-roles.model';
import { Posts } from '../posts/models/post.model';
import { AuthModule } from '../auth/auth.module';
import { RolesService } from '../roles/roles.service';

@Module({
  imports: [SequelizeModule.forFeature([User,Role,UserRoles,Posts]),
  forwardRef(()=> AuthModule)
],
  controllers: [UsersController],
  providers: [UsersService, RolesService],
  exports: [UsersService]
})
export class UsersModule {}
