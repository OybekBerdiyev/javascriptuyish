import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { StationFuel } from './models/stationFuel.model';
import { CreateStationfuelDto } from './dto/create-stationFuel.dto';
import { UpdatestationfuelDto } from './dto/update-stationFuel.dto';

@Injectable()
export class StationFuelService {
    constructor(@InjectModel(StationFuel) private stationFuelRepo: typeof StationFuel) {}


    async create(createStationFuelDto: CreateStationfuelDto): Promise<StationFuel>{
        const stationFuel = await this.stationFuelRepo.create(createStationFuelDto)
        return stationFuel
    }

    async findAll(): Promise<StationFuel[]>{
        return this.stationFuelRepo.findAll({include:{all:true}})
    }
    
    async findOne(id:number): Promise<StationFuel>{
        return this.stationFuelRepo.findByPk(id)
    }

    async updateById(id: number,updatestionfuelDto:UpdatestationfuelDto): Promise<StationFuel>{
        const gas = await this.stationFuelRepo.update(updatestionfuelDto, {where: {id}, returning: true})
        return gas[1][0]
    }

    async deleteById (id:number):Promise<Number> {
        return this.stationFuelRepo.destroy({where:{id}})
    }
}
