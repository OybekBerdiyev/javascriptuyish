import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFeedingDto } from './dto/create-feeding.dto';
import { UpdateFeedingDto } from './dto/update-feeding.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Animal, AnimalDocument } from '../animals/schemas/animal.schema';
import { Worker, WorkerDocument } from '../worker/schemas/worker.schema';
import { Model } from 'mongoose';
import { Feeding, FeedingDocument } from './schemas/feeding.schema';

@Injectable()
export class FeedingService {
constructor(
  @InjectModel(Feeding.name) private readonly feedingModel: Model<FeedingDocument>,
  @InjectModel(Animal.name) private readonly animalModel: Model<AnimalDocument>,
  @InjectModel(Worker.name) private readonly workerModel: Model<WorkerDocument>, 
  ) {}
  async create(createFeedingDto: CreateFeedingDto) {
    const animal = await this.animalModel.findOne(createFeedingDto.animal_id);
    const worker = await this.workerModel.findOne(createFeedingDto.worker_id);
    if(!animal && !worker) {
      throw new NotFoundException("Worker or Animal not found")
    }    
    return this.feedingModel.create(createFeedingDto)
  }

  findAll() {
    return `This action returns all feeding`;
  }

  findOne(id: number) {
    return `This action returns a #${id} feeding`;
  }

  update(id: number, updateFeedingDto: UpdateFeedingDto) {
    return `This action updates a #${id} feeding`;
  }

  remove(id: number) {
    return `This action removes a #${id} feeding`;
  }
}
