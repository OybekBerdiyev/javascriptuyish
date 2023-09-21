import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { MainStation } from './models/gas-station.model';
import { CreateStationDto } from './dto/create-station.dto';
import { UpdateStationDto } from './dto/updata-station.dto';

@Injectable()
export class MainStationService {
    constructor(@InjectModel(MainStation) private mainStationRepo: typeof MainStation) {}


    async create(createMainStationDto: CreateStationDto): Promise<MainStation>{
        const mainStation = await this.mainStationRepo.create(createMainStationDto)
        return mainStation
    }

    async findAll(): Promise<MainStation[]>{
        return this.mainStationRepo.findAll({include:{all:true}})
    }
    async findOne(id:number): Promise<MainStation>{
        return this.mainStationRepo.findByPk(id)
    }

    async updateById(id: number,updateStationDto:UpdateStationDto): Promise<MainStation>{
        const gas = await this.mainStationRepo.update(updateStationDto, {where: {id}, returning: true})
        return gas[1][0]
    }

    async deleteById (id:number):Promise<Number> {
        return this.mainStationRepo.destroy({where:{id}})
    }
}
