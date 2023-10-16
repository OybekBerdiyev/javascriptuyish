import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMeatProductionDto } from './dto/create-meat_production.dto';
import { UpdateMeatProductionDto } from './dto/update-meat_production.dto';
import { InjectModel } from '@nestjs/mongoose';
import { MeatProduction, MeatProductionDocument } from './schemas/meat_production.schema';
import { Model } from 'mongoose';
import { Animal, AnimalDocument } from '../animals/schemas/animal.schema';

@Injectable()
export class MeatProductionService {

  constructor(
    @InjectModel(MeatProduction.name) private readonly meatModel: Model<MeatProductionDocument>,
    @InjectModel(Animal.name) private readonly animalModel: Model<AnimalDocument>
  ) {}

  async create(createMeatProductionDto: CreateMeatProductionDto) {
    const {animal_id} = createMeatProductionDto
    const animal = await this.animalModel.findById(animal_id)
    if (!animal) {
      throw new NotFoundException("Animal not found")
    }
    return this.meatModel.create(createMeatProductionDto)
  }

  findAll() {
    return this.meatModel.find().populate("animal_id");
  }

  findOne(id: string) {
    return this.meatModel.findById(id).populate("animal_id");
  }

  update(id: string, updateMeatProductionDto: UpdateMeatProductionDto) {
    return this.meatModel.findByIdAndUpdate(id, updateMeatProductionDto, {new: true})
  }

  async remove(id: string) {
    await this.meatModel.findByIdAndDelete(id);
    return {message: "success"}
  }
}
