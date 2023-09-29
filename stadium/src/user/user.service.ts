import { BadRequestException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './Models/user.models';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import *as bcrypt from 'bcrypt';
import {v4} from 'uuid'
import { MailService } from 'src/mail/mail.service';
import { LoginUserDto } from './dto/login-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { Op } from 'sequelize';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userRepo: typeof User,
    private readonly  jwtService: JwtService,
    private readonly mailService: MailService,
  ){}

  async getToken(user: User){
    const jwtPayload = {
      id: user.id,
      is_active: user.is_active,
      is_owner: user.is_owner
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME
      }),
    ])
    return {
      access_token: accessToken,
    refresh_token: refreshToken
  }
  }

  async registeration(createUserDto: CreateUserDto, res: Response){
    const user = await this.userRepo.findOne({
      where:{username: createUserDto.username}
    })
    if (user) {
      throw new BadRequestException("User already exists")
    }
    if (createUserDto.password !== createUserDto.confirm_password){
      throw new BadRequestException("Passwor is not match")
    }
    const hashed_password = await bcrypt.hash(createUserDto.password, 7)
    const newUser = await this.userRepo.create({
      ...createUserDto,
      hashed_password: hashed_password
    });
    const tokens = await this.getToken(newUser);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7)
    const  uniqueKey: string = v4();
    const updatedUser = await this.userRepo.update(
      {
        hashed_refresh_token: hashed_refresh_token,
        activation_link: uniqueKey
    },
    {
      where: {id: newUser.id},returning : true
    }
    )
    res.cookie("refresh_token", tokens.refresh_token, {
      maxAge: 10 * 60 * 24 * 60 * 1000,
      httpOnly: true
    })

    try {
      await this.mailService.sendUserConfirmation(updatedUser[1][0])
    } catch (error) {
      console.log(error); 
    }

    
    const respons = {
      message: "User registred",
      user: updatedUser[1][0],
      tokens,
    }
    return respons
  }
  
  async activate(link:string) {
    if(!link){
      throw new BadRequestException('Activation link not found')
    }
    const updatedUser = await this.userRepo.update({is_active: true}, {where: {activation_link:link, is_active:false},returning:true})
    if(!updatedUser[1][0]){
      throw new BadRequestException('User already activate')
    }
    const response = {
      message: "User activate succesfully",
      user: updatedUser
    }
    return response
  }

  async login (loginUserDto: LoginUserDto, res: Response) {
    const {email, password} = loginUserDto
    const user = await this.userRepo.findOne({where: {email}});
    if(!user) {
      throw new UnauthorizedException('email or password incorrect')
    }
    if(!user.is_active) {
      throw new UnauthorizedException('User not active')
    }
    const isMatchPass = await bcrypt.compare(password,user.hashed_password)
    if(!isMatchPass) {
      throw new UnauthorizedException('email or password incorrect')
    }

    const tokens = await this.getToken(user)
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token,12);
    const updateUser = await this.userRepo.update(
      {hashed_refresh_token}, {where: {id:user.id},returning:true}
    )

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15*24*60*60*1000,
      httpOnly: true,
    })

    const response = {
      message: "User loggid in",
      user: updateUser[1][0],
      tokens
    }
    return response
  }

  async logout(refreshToken: string, res: Response) {
    const userData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    })
    if(!userData) {
      throw new ForbiddenException("User not found")
    }
    const updatedUser = await this.userRepo.update({hashed_refresh_token: null}, {where: {id: userData.id}, returning: true})
    res.clearCookie('refresh_token')
    const response = {
      message: "User loggged out",
      user: updatedUser[1][0]    
      }
      return response
  }

  async refreshToken (user_id:number, refreshToken:string, res: Response) {
    const decodedToken = this.jwtService.decode(refreshToken);
    if(user_id!=decodedToken['id']) {
      throw new BadRequestException("User not found")
    }
    
    const user = await this.userRepo.findOne({where: {id: user_id}})
    if(!user) {
      throw new BadRequestException("User not found")
    }
    const tokenMatch = await bcrypt.compare(
      refreshToken,
      user.hashed_refresh_token,
    );
    if(!tokenMatch) {
      throw new ForbiddenException('forbidden')
    }
    const tokens = await this.getToken(user)
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token,12);
    const updateUser = await this.userRepo.update(
      {hashed_refresh_token}, {where: {id:user.id},returning:true}
    )

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15*24*60*60*1000,
      httpOnly: true,
    })

    const response = {
      message: "ok",
      user: updateUser[1][0],
      tokens
    }
    return response
  }

  async findAll (findUserDto: FindUserDto) {
    const where = {}

    if(findUserDto.first_name) {
      where['first_name'] = {
        [Op.like]: `%${findUserDto.first_name}%`
      }
    }
    if(findUserDto.last_name) {
      where['last_name'] = {
        [Op.like]: `%${findUserDto.last_name}%`
      }
    }
    if(findUserDto.username) {
      where['username'] = {
        [Op.like]: `%${findUserDto.username}%`
      }
    }
    if(findUserDto.phone) {
      where['phone'] = {
        [Op.like]: `%${findUserDto.phone}%`
      }
    }

    if(findUserDto.email) {
      where['email'] = {
        [Op.like]: `%${findUserDto.email}%`
      }
    }
    if(findUserDto.birthday_begin && findUserDto.birthday_end) {
      where[Op.and] = {
        birthday: {
          [Op.between]: [findUserDto.birthday_begin, findUserDto.birthday_end]
        }
      }
    } else if(findUserDto.birthday_begin) {
      where['birthday'] = { [Op.gte]: findUserDto.birthday_begin}
    }else if(findUserDto.birthday_end) {
      where['birthday'] = { [Op.lte]: findUserDto.birthday_end}
    }
    const users = await User.findAll({where})
    if(!users) {
      throw new BadRequestException("not found")
    }
    return users
  }
}
