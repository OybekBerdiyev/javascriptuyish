import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Admin, AdminDocument } from './schemas/admin.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { TokensService } from '../tokens/tokens.service';
import { log } from 'console';


@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
    private readonly jwtService: JwtService,
    private readonly tokenService: TokensService,
    ) {}

  async create(createAdminDto: CreateAdminDto){
    const {password, confirm_password} = createAdminDto;
    if(password!== confirm_password){
      throw new BadRequestException('Passwords do not match');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdAdmin = await this.adminModel.create({...createAdminDto, hashed_password: hashedPassword})
    const token = await this.tokenService.getToken(createdAdmin)

    const hashedtoken = await bcrypt.hash(token.refresh_token,12);
    const updatedAdmin = await this.adminModel.findByIdAndUpdate(createdAdmin._id, {hashed_token: hashedtoken}, {new: true})

    const payload = {
      Admin: updatedAdmin,
      tokens: token
    }

    return payload;
  }

  findAll() {
    return this.adminModel.find();
  }

  findOne(id: string) {
    log(id)
    return this.adminModel.findById(id);
  }

  update(id: string, updateAdminDto: UpdateAdminDto) {
    return this.adminModel.findByIdAndUpdate(id,updateAdminDto,{new:true})
  }

  remove(id: string) {
    return this.adminModel.findByIdAndRemove(id);
  }
}
