import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FuelType } from './models/fuelType.model';
import { UpdatefuilTypeDto } from './dto/update-fuelType.dto';
import { CreatefuilTypeDto } from './dto/create-fuelType.dto';

@Injectable()
export class FuelTypeService {
    constructor(@InjectModel(FuelType) private fuelTypeRepo: typeof FuelType) {}


    async create(createFuelTypeDto: CreatefuilTypeDto): Promise<FuelType>{
        const fuelType = await this.fuelTypeRepo.create(createFuelTypeDto)
        return fuelType
    }

    async findAll(): Promise<FuelType[]>{
        return this.fuelTypeRepo.findAll({include:{all:true}})
    }
    async findOne(id:number): Promise<FuelType>{
        return this.fuelTypeRepo.findByPk(id)
    }

    async updateById(id: number,updateFuelTypeDto:UpdatefuilTypeDto): Promise<FuelType>{
        const gas = await this.fuelTypeRepo.update(updateFuelTypeDto, {where: {id}, returning: true})
        return gas[1][0]
    }

    async deleteById (id:number):Promise<Number> {
        return this.fuelTypeRepo.destroy({where:{id}})
    }
}
