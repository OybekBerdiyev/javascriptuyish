import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Machine_driver } from './models/md.model';
import { CreateMd } from './dto/create_md.dto';

@Injectable()
export class MachineDriverService {
    constructor(@InjectModel(Machine_driver) private mdRepo:typeof Machine_driver) {} 
    async create(createMdDto: CreateMd ): Promise<Machine_driver>{
        const md = await this.mdRepo.create(createMdDto)
        return md
    }

    async findAll (): Promise<Machine_driver[]>{        
        return this.mdRepo.findAll({
            include: {all:true},
        })
    }

    async findByID (id:number): Promise<Machine_driver> {
        return this.mdRepo.findByPk(id)
    }

    async deleteById (id:number): Promise<Number> {
        return this.mdRepo.destroy({where:{id}})
    }

    // async updateById(id: number, updateCompanyDto: UpdateMachineDto) {
    //     const [updatedCount, [updatedCompany]] = await this.mdRepo.update(updateCompanyDto, {
    //         where: { id },
    //         returning: true,
    //     });
    //         return updatedCompany;
    // }
}
