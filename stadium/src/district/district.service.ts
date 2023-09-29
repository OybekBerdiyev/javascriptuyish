import { Injectable } from '@nestjs/common';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { InjectModel } from '@nestjs/sequelize';
import { District } from './Models/district.models';

@Injectable()
export class DistrictService {
  constructor(@InjectModel(District) private readonly districtRepo: typeof District) {}
 
  create(createDistrictDto: CreateDistrictDto) {
    return this.districtRepo.create(createDistrictDto)
  }

  findAll() {
    return this.districtRepo.findAll({include: {all:true}});
  }

  findOne(id: number) {
    const district = this.districtRepo.findByPk(id);
    return district;
  }

  async update(id: number, updateDistrictDto: UpdateDistrictDto) {
    const upd = await this.districtRepo.update(updateDistrictDto,{where:{id},returning:true})
    return upd[1][0];  
  }

  async remove(id: number) {
    await this.districtRepo.destroy({where:{id}})
    return {message: 'Succes'}
  }
}
