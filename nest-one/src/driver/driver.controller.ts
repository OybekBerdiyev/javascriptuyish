import { Controller } from '@nestjs/common';
import {Post, Body,Get,Param, Delete} from '@nestjs/common';
import { DriverService } from './driver.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { Driver } from './models/driver.model';

@Controller('driver')
export class DriverController {
    constructor(private readonly driverService: DriverService) {}

    @Post('create')
    async createDriver(@Body() createDriverDto:CreateDriverDto){
        return this.driverService.createDriver(createDriverDto)
    }
    @Get ('all') 
    async findAllDrivers():Promise<Driver[]>{
        return this.driverService.findAllDrivers()
    }
    @Get (':id') 
    async findByID (@Param("id") id:string): Promise<Driver> {
        return this.driverService.findByID(+id)
    }
    @Delete (':id') 
    async deleteById (@Param("id") id:string){
        return this.driverService.deleteById(+id)
    }
}
