import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFiberProductionDto } from './dto/create-fiber_production.dto';
import { UpdateFiberProductionDto } from './dto/update-fiber_production.dto';
import { InjectModel } from '@nestjs/mongoose';
import { FiberProduction, FiberProductionDocument } from './schemas/fiber_production.schema';
import { Model } from 'mongoose';
import { Animal, AnimalDocument } from '../animals/schemas/animal.schema';

@Injectable()
export class FiberProductionService {
  constructor(
    @InjectModel(FiberProduction.name) private readonly fiberModel: Model<FiberProductionDocument>,
    @InjectModel(Animal.name) private readonly animalModel: Model<AnimalDocument>
  ) {}

  async create(createFiberProductionDto: CreateFiberProductionDto) {
    const {animal_id} = createFiberProductionDto
    const animal = await this.animalModel.findById(animal_id)
    if (!animal) {
      throw new NotFoundException("Animal not found")
    }
    return this.fiberModel.create(createFiberProductionDto)
  }

  findAll() {
    return this.fiberModel.find().populate("animal_id")
  }

  findOne(id: string) {
    return this.fiberModel.findById(id).populate("animal_id");
  }

  update(id: string, updateFiberProductionDto: UpdateFiberProductionDto) {
    return this.fiberModel.findByIdAndUpdate(id, updateFiberProductionDto, {new: true});
  }

  async remove(id: string) {
    await this.fiberModel.findByIdAndDelete(id);
    return {message: "success"}
  }
}
