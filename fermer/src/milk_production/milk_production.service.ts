import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMilkProductionDto } from './dto/create-milk_production.dto';
import { UpdateMilkProductionDto } from './dto/update-milk_production.dto';
import { InjectModel } from '@nestjs/mongoose';
import { MilkProduction, MilkProductionDocument } from './schemas/milk_production.schema';
import { Model } from 'mongoose';
import { Animal, AnimalDocument } from '../animals/schemas/animal.schema';

@Injectable()
export class MilkProductionService {

  constructor(
    @InjectModel(MilkProduction.name) private readonly milkModel: Model<MilkProductionDocument>,
    @InjectModel(Animal.name) private readonly animalModel: Model<AnimalDocument>
  ) {}


  async create(createMilkProductionDto: CreateMilkProductionDto) {
    const {animal_id} = createMilkProductionDto
    const animal = await this.animalModel.findById(animal_id)
    if (!animal) {
      throw new NotFoundException("Animal not found")
    }
    return this.milkModel.create(createMilkProductionDto)
  }

  findAll() {
    return this.milkModel.find().populate("animal_id");
  }

  findOne(id: string) {
    return this.milkModel.findById(id).populate("animal_id");
  }

  update(id: string, updateMilkProductionDto: UpdateMilkProductionDto) {
    return this.milkModel.findByIdAndUpdate(id, updateMilkProductionDto, {new: true});
  }

  async remove(id: string) {
    await this.milkModel.findByIdAndDelete(id);
    return {message: "success"}
  }
}
