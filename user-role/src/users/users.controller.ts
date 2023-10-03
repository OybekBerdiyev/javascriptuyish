import { Controller, Get, Post, Body, Param, Delete, HttpCode, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AddRoleDto } from './dto/add-role.dto';
import { ActivateUserDto } from './dto/actuvate-user.dto';
import { ApiResponse, ApiTags,ApiOperation } from '@nestjs/swagger';
import { User } from './models/user.model';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { UserSelfGuard } from 'src/guards/user-self.guard';
import { Roles } from 'src/decorators/roles-auth.decorator';
import { RolesGuard } from 'src/guards/roles.guard';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({summary:"Create user"})
  @ApiResponse({status:201, description:"foydalanuvchi  ma'lumotlari"})
  @HttpCode(200)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  
  @ApiOperation({summary:"Add role to user"})
  @HttpCode(200)
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('add_role')
  addrole(@Body() addRoleDto: AddRoleDto) {
    return this.usersService.addRole(addRoleDto);
  }

  @ApiOperation({summary:"Activate user"})
  @HttpCode(200)
  @Post('activate')
  activateUser(@Body() activateUserDto: ActivateUserDto) {
    return this.usersService.activateUser(activateUserDto)
  }

  @ApiOperation({summary:"Delete role from user"})
  @HttpCode(200)
  @Roles('SUPERADMIN')
  @UseGuards(RolesGuard)
  @Post('remove_role')
  removeRole(@Body() addRoleDto: AddRoleDto) {
    return this.usersService.removeRole(addRoleDto);
  }
  
  @ApiOperation({summary:"Get All user"})
  @ApiResponse({status:200, description:"foydalanuvchi  ma'lumotlari", type:[User]})
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
  
  @ApiOperation({summary:"Get one user"})
  @UseGuards(UserSelfGuard,JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @ApiOperation({summary:"Update user by id"})
  @UseGuards(UserSelfGuard,JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }
  
  @ApiOperation({summary:"Delete user by id"})
  @UseGuards(UserSelfGuard,JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}


// 935029009