import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInfoDto } from './dto/create-info.dto';
import { UpdateInfoDto } from './dto/update-info.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Info, InfoDocument } from './schemas/info.schema';
import { Model } from 'mongoose';
import { Block, BlockDocument } from '../blocks/schemas/block.schema';
import { Animal, AnimalDocument } from '../animals/schemas/animal.schema';

@Injectable()
export class InfoService {
  constructor(
    @InjectModel(Info.name) private readonly infoModel: Model<InfoDocument>,
    @InjectModel(Animal.name) private readonly animalModel: Model<AnimalDocument>,
    @InjectModel(Block.name) private readonly blockModel: Model<BlockDocument>,
    ){}
  async create(createInfoDto: CreateInfoDto) {
    const animal = await this.animalModel.findOne(createInfoDto.animal_id);
    const block = await this.blockModel.findOne(createInfoDto.block_id);
    if(!animal && !block) {
      throw new NotFoundException("block or Animal not found")
    }    
    return this.infoModel.create(createInfoDto)
  }
  

  findAll() {
    return this.infoModel.find();
  }

  findOne(id: string) {
    return this.infoModel.findById(id);
  }

  update(id: string, updateInfoDto: UpdateInfoDto) {
    return this.infoModel.findByIdAndUpdate(id, updateInfoDto)
  }

  remove(id: string) {
    return this.infoModel.findByIdAndDelete(id)
  }
}
