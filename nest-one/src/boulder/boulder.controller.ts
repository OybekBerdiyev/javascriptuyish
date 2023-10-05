import { Controller } from '@nestjs/common';
import {Post, Body,Get,Param} from '@nestjs/common';
import { BulderService } from './boulder.service';
import { CreateBulderDto } from './dto/create-boulder.dto';
import { Bulder } from './models/boulder.model';

@Controller('builder')
export class BuilderController {
    constructor(private readonly bulderService: BulderService) {}

    @Post('create')
    async createBulder(@Body()createBuilderDto:CreateBulderDto){
        return this.bulderService.createBulder(createBuilderDto)
    }
    @Get ('all') 
    async findAllBulder():Promise<Bulder[]>{
        return this.bulderService.findAllBulder()
    }
    @Get (':id') 
    async findByID (@Param("id") id:string): Promise<Bulder> {
        return this.bulderService.findByID(+id)
    }
}
