import { Injectable } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Region } from './Models/region.models';

@Injectable()
export class RegionService {

  constructor(@InjectModel(Region) private readonly regionRepo: typeof Region) { }

  create(createRegionDto: CreateRegionDto) {
    return this.regionRepo.create(createRegionDto)
  }

  findAll() {
    return this.regionRepo.findAll({include: {all:true}});
  }

  async findOne(id: number) {
    const user = this.regionRepo.findOne({where:{id},include: {all:true}})
    return user;
  }

  async update(id: number, updateRegionDto: UpdateRegionDto) {
    const upd = await this.regionRepo.update(updateRegionDto,{where:{id},returning:true})
    return upd[1][0];
  }

  async remove(id: number) {
    await this.regionRepo.destroy({where:{id}})
    return {message: 'Succes'}
  }
}
