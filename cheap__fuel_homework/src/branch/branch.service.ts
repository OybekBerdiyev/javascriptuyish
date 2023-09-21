import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Branch } from './models/branch.model';
import { CreateBranchDto } from './dto/create-banch.dto';
import { UpdateBranchDto } from './dto/updat-branch.dto';

@Injectable()
export class BranchService {
    constructor(@InjectModel(Branch) private mainStationRepo: typeof Branch) {}


    async create(createBranchDto: CreateBranchDto): Promise<Branch>{
        const branch = await this.mainStationRepo.create(createBranchDto)
        return branch
    }

    async findAll(): Promise<Branch[]>{
        return this.mainStationRepo.findAll({include:{all:true}})
    }
    
    async findOne(id:number): Promise<Branch>{
        return this.mainStationRepo.findByPk(id)
    }

    async updateById(id: number,updateBranchDto:UpdateBranchDto): Promise<Branch>{
        const gas = await this.mainStationRepo.update(updateBranchDto, {where: {id}, returning: true})
        return gas[1][0]
    }

    async deleteById (id:number):Promise<Number> {
        return this.mainStationRepo.destroy({where:{id}})
    }
}
