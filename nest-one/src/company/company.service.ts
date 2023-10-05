import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Company } from './models/company.model';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/upd-company.dto';

@Injectable()
export class CompanyService {
    constructor(@InjectModel(Company) private companyRepo:typeof Company) {} 
    async createCompany(createCompanyDto: CreateCompanyDto): Promise<Company>{
        const company = await this.companyRepo.create(createCompanyDto)
        return company
    }

    async findAllCompany (): Promise<Company[]>{        
        return this.companyRepo.findAll({
            include: {all:true},
        })
    }

    async findByID (id:number): Promise<Company> {
        return this.companyRepo.findByPk(id)
    }
    async findByName (name:string): Promise<Company> {
        return this.companyRepo.findOne({where:{name}});
    }
    async deleteById (id:number): Promise<Number> {
        return this.companyRepo.destroy({where:{id}})
    }

    async updateById(id: number, updateCompanyDto: UpdateCompanyDto) {
        const [updatedCount, [updatedCompany]] = await this.companyRepo.update(updateCompanyDto, {
            where: { id },
            returning: true,
        });
            return updatedCompany;
    }
}
