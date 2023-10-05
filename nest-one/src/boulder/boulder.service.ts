import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Bulder } from './models/boulder.model';
import { CreateBulderDto } from './dto/create-boulder.dto';
import { UpdateBulderDto } from './dto/update-boulder.dto';

@Injectable()
export class BulderService {
    constructor(@InjectModel(Bulder) private companyRepo:typeof Bulder) {} 
    async createBulder(createBulderDto: CreateBulderDto): Promise<Bulder>{
        const company = await this.companyRepo.create(createBulderDto)
        return company
    }

    async findAllBulder (): Promise<Bulder[]>{        
        return this.companyRepo.findAll({
            include: {all:true},
        })
    }

    async findByID (id:number): Promise<Bulder> {
        return this.companyRepo.findByPk(id)
    }
    async findByName (full_name:string): Promise<Bulder> {
        return this.companyRepo.findOne({where:{full_name}});
    }
    async deleteById (id:number): Promise<Number> {
        return this.companyRepo.destroy({where:{id}})
    }

    // async updateById(id: number, updateBulderDto: UpdateBulderDto) {
    //     const [updatedCount, [updatedBulder]] = await this.companyRepo.update(updateBulderDto, {
    //         where: { id },
    //         returning: true,
    //     });
    //         return updatedBulder;
    // }
}
