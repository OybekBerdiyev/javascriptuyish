import { Controller } from '@nestjs/common';
import {Post, Body,Get,Param} from '@nestjs/common';
import { CreateMachineDto } from './dto/create-machine.dto';
import { Machine } from './models/machine.model';
import { MachineService } from './machine.service';

@Controller('machine')
export class MachineController {
    constructor(private readonly companyService: MachineService) {}

    @Post('create')
    async createCompany(@Body()createCompanyDto:CreateMachineDto){
        return this.companyService.createCompany(createCompanyDto)
    }
    @Get ('all') 
    async findAllCompany():Promise<Machine[]>{
        return this.companyService.findAllCompany()
    }
    @Get (':id') 
    async findByID (@Param("id") id:string): Promise<Machine> {
        return this.companyService.findByID(+id)
    }
}
