import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UpdateMachineDto } from './dto/update-machine.dto';
import { Machine } from './models/machine.model';
import {CreateMachineDto} from './dto/create-machine.dto'

@Injectable()
export class MachineService {
    constructor(@InjectModel(Machine) private machineRepo:typeof Machine) {} 
    async createCompany(createMachineDto: CreateMachineDto ): Promise<Machine>{
        const machine = await this.machineRepo.create(createMachineDto)
        return machine
    }

    async findAllCompany (): Promise<Machine[]>{        
        return this.machineRepo.findAll({
            include: {all:true},
        })
    }

    async findByID (id:number): Promise<Machine> {
        return this.machineRepo.findByPk(id)
    }
    async findByName (name:string): Promise<Machine> {
        return this.machineRepo.findOne({where:{name}});
    }
    async deleteById (id:number): Promise<Number> {
        return this.machineRepo.destroy({where:{id}})
    }

    // async updateById(id: number, updateCompanyDto: UpdateMachineDto) {
    //     const [updatedCount, [updatedCompany]] = await this.machineRepo.update(updateCompanyDto, {
    //         where: { id },
    //         returning: true,
    //     });
    //         return updatedCompany;
    // }
}
