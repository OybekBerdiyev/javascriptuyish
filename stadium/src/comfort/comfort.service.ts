import { Injectable } from '@nestjs/common';
import { CreateComfortDto } from './dto/create-comfort.dto';
import { UpdateComfortDto } from './dto/update-comfort.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Comfort } from './Models/comfort.models';

@Injectable()
export class ComfortService {
  constructor(@InjectModel(Comfort) private readonly comfortRepo: typeof Comfort){}
  
  create(createComfortDto: CreateComfortDto) {
    return this.comfortRepo.create(createComfortDto)
  }

  findAll() {
    return this.comfortRepo.findAll({include: {all:true}});;
  }

  findOne(id: number) {
    const data = this.comfortRepo.findByPk(id);
    return data;
  }

  async update(id: number, updateComfortDto: UpdateComfortDto) {
    const upd = await this.comfortRepo.update(updateComfortDto,{where:{id},returning:true})
    return upd[1][0]; 
   }

  async remove(id: number) {
    await this.comfortRepo.destroy({where:{id}})
    return {message: 'Succes'}
  }
}
