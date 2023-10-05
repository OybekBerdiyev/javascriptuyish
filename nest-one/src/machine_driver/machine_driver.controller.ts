import {Post, Body,Get,Param,Controller, Delete } from '@nestjs/common';
import { MachineDriverService } from './machine_driver.service';
import { Machine_driver } from './models/md.model';
import { CreateMd } from './dto/create_md.dto';

@Controller('md')
export class MachineDriverController {
    constructor(private readonly mdService: MachineDriverService) {}

    @Post('create')
    async createCompany(@Body()createMdDto: CreateMd){
        return this.mdService.create(createMdDto)
    }
    @Get ('all') 
    async findAllCompany():Promise<Machine_driver[]>{
        return this.mdService.findAll()
    }
    @Get (':id') 
    async findByID (@Param("id") id:string): Promise<Machine_driver> {
        return this.mdService.findByID(+id)
    }
    @Delete (':id') 
    async deleteByID (@Param("id") id:string) {
        return this.mdService.deleteById(+id)
    }
}
