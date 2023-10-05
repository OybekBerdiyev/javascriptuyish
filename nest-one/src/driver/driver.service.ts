import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Driver } from './models/driver.model';
import { CreateDriverDto } from './dto/create-driver.dto';

@Injectable()
export class DriverService {
    constructor(@InjectModel(Driver) private drivereRepo:typeof Driver) {} 

    async createDriver(createDriverDto: CreateDriverDto ): Promise<Driver>{
        const driver = await this.drivereRepo.create(createDriverDto)
        return driver
    }

    async findAllDrivers (): Promise<Driver[]>{        
        return this.drivereRepo.findAll({
            include: {all:true},
        })
    }
    async findByID (id:number): Promise<Driver> {
        return this.drivereRepo.findByPk(id)
    }
    async deleteById (id:number): Promise<Number> {
        return this.drivereRepo.destroy({where:{id}})
    }

    // async updateById(id: number, updateCompanyDto: Update) {
    //     const [updatedCount, [updatedCompany]] = await this.drivereRepo.update(updateCompanyDto, {
    //         where: { id },
    //         returning: true,
    //     });
    //         return updatedCompany;
    // }
}
