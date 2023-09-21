import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BranchService } from './branch.service';
import { Branch } from './models/branch.model';
import { UpdateBranchDto } from './dto/updat-branch.dto';
import { CreateBranchDto } from './dto/create-banch.dto';

@Controller('branch')
export class BranchController {
    constructor(private readonly branchService: BranchService ) {}

    @Post("create")
    async create(@Body()createBranchDto:CreateBranchDto){
        return this.branchService.create(createBranchDto)
    }

    @Get("all")
    async findAll():Promise<Branch[]>{
        return this.branchService.findAll()
    }

    @Get(":id")
    async findOne(@Param("id") id:string):Promise<Branch>{
        return this.branchService.findOne(+id)
    }

    @Put(":id")
    async update(@Param("id") id:string, @Body()updateBranchDto:UpdateBranchDto):Promise<Branch>{
        return this.branchService.updateById(+id,updateBranchDto)
    }

    @Delete(":id")
    async remove(@Param("id") id:string): Promise<Number>{
        return this.branchService.deleteById(+id)
    }
}
