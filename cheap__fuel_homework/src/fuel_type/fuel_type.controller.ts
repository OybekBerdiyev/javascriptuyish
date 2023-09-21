import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { FuelTypeService } from './fuel_type.service';
import { FuelType } from './models/fuelType.model';
import { CreatefuilTypeDto } from './dto/create-fuelType.dto';
import { UpdatefuilTypeDto } from './dto/update-fuelType.dto';

@Controller('fueltype')
export class FuelTypeController {
    constructor(private readonly fuelTypeService: FuelTypeService ) {}

    @Post("create")
    async create(@Body()createFuelTypeDto:CreatefuilTypeDto){
        return this.fuelTypeService.create(createFuelTypeDto)
    }

    @Get("all")
    async findAll():Promise<FuelType[]>{
        return this.fuelTypeService.findAll()
    }

    @Get(":id")
    async findOne(@Param("id") id:string):Promise<FuelType>{
        return this.fuelTypeService.findOne(+id)
    }

    @Put(":id")
    async update(@Param("id") id:string, @Body()updatefuelTypeDto:UpdatefuilTypeDto):Promise<FuelType>{
        return this.fuelTypeService.updateById(+id,updatefuelTypeDto)
    }

    @Delete(":id")
    async remove(@Param("id") id:string): Promise<Number>{
        return this.fuelTypeService.deleteById(+id)
    }
}
