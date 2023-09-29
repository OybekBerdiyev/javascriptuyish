import { Controller, Get, Post, Body, Param, Delete, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './Models/user.models';
import { Response } from 'express';
import { LoginUserDto } from './dto/login-user.dto';
import { CookieGetter } from './../decorators/cookie-getter.decorator';
import { USerGurad } from 'src/guards/user.guard';
import { FindUserDto } from './dto/find-user.dto';


@ApiTags("Users")
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({summary: "register user"})
  @ApiResponse({status: 201, type: User})
  @Post("signup")
  registeration(
    @Body() createUserDto: CreateUserDto,
    @Res({passthrough: true}) res: Response
    ) {
    return this.userService.registeration(createUserDto, res);
  }
 
  @ApiOperation({summary: "login user"})
  @ApiResponse({status: 200, type: User})
  @Post("login")
  login(
    @Body() loginUserDto: LoginUserDto,
    @Res({passthrough: true}) res: Response
    ) {
    return this.userService.login(loginUserDto, res);
  }

  @ApiOperation({summary: "activate user"})
  @ApiResponse({status: 200, type: [User]})
  @Get('activate/:link')
  activate(@Param('link') link:string) {
    return this.userService.activate(link)
  }

  @ApiOperation({summary: "logout user"})
  @UseGuards(USerGurad)
  @Post("logout")
  logout(@CookieGetter('refresh_token') refresh_token: string, @Res({passthrough: true}) res: Response) {
    return this.userService.logout(refresh_token, res)
  }

  @ApiOperation({summary: "refresh user's tokens"})
  @Post(':id/refresh')
  refresh(@Param('id') id:string, @CookieGetter('refresh_token') refreshToken:string,@Res({passthrough: true}) res: Response){
    return this.userService.refreshToken(+id,refreshToken,res)
  }

  @ApiOperation({summary: "filter users"})
  @Post('find')
  findAll(@Body() findUserDto: FindUserDto) {
    return this.userService.findAll(findUserDto)
  }

}
