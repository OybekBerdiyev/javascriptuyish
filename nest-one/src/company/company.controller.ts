import { Controller } from '@nestjs/common';
import { CompanyService } from './company.service';
import {Post, Body,Get,Param} from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { Company } from './models/company.model';

@Controller('company')
export class CompanyController {
    constructor(private readonly companyService: CompanyService) {}

    @Post('create')
    async createCompany(@Body()createCompanyDto:CreateCompanyDto){
        return this.companyService.createCompany(createCompanyDto)
    }
    @Get ('all') 
    async findAllCompany():Promise<Company[]>{
        return this.companyService.findAllCompany()
    }
    @Get (':id') 
    async findByID (@Param("id") id:string): Promise<Company> {
        return this.companyService.findByID(+id)
    }
    @Get ('name/:name') 
    async findByName (@Param("name") name:string): Promise<Company> {
        return this.companyService.findByName(name)
    }
}
