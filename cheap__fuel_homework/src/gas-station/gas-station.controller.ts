import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateStationDto } from './dto/create-station.dto';
import { MainStationService } from './gas-station.service';
import { MainStation } from './models/gas-station.model';
import { UpdateStationDto } from './dto/updata-station.dto';

@Controller('mainStation')
export class GasStationController {
    constructor(private readonly mainStationService: MainStationService ) {}

    @Post("create")
    async create(@Body()createStationDto:CreateStationDto){
        return this.mainStationService.create(createStationDto)
    }

    @Get("all")
    async findAll():Promise<MainStation[]>{
        return this.mainStationService.findAll()
    }

    @Get(":id")
    async findOne(@Param("id") id:string):Promise<MainStation>{
        return this.mainStationService.findOne(+id)
    }

    @Put(":id")
    async update(@Param("id") id:string, @Body()updateStationDto:UpdateStationDto):Promise<MainStation>{
        return this.mainStationService.updateById(+id,updateStationDto)
    }

    @Delete(":id")
    async remove(@Param("id") id:string): Promise<Number>{
        return this.mainStationService.deleteById(+id)
    }
}
