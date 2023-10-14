import { Injectable } from '@nestjs/common';
import { CreateBlockWorkerDto } from './dto/create-block_worker.dto';
import { UpdateBlockWorkerDto } from './dto/update-block_worker.dto';
import { BlockWorker } from './schemas/block_worker.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class BlockWorkerService {
  constructor(
    @InjectModel(BlockWorker.name) private readonly blockWorkerModel: Model<BlockWorker>,
  ) {}
  create(createBlockWorkerDto: CreateBlockWorkerDto) {
    return this.blockWorkerModel.create(createBlockWorkerDto);
  }

  findAll() {
    return `This action returns all blockWorker`;
  }

  findOne(id: number) {
    return `This action returns a #${id} blockWorker`;
  }

  update(id: number, updateBlockWorkerDto: UpdateBlockWorkerDto) {
    return `This action updates a #${id} blockWorker`;
  }

  remove(id: number) {
    return `This action removes a #${id} blockWorker`;
  }
}
