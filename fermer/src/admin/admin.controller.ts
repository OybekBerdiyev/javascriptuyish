import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post("create")
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Get("get")
  findAll() {
    return this.adminService.findAll();
  }

  @Get('/getone/:id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(id);
  }

  @Get("test")
  test() {
    return "bu test"
  }

  @Put('update/:id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(id, updateAdminDto);
  }

  @Delete('remove/:id')
  async remove(@Param('id') id: string) {
    await this.adminService.remove(id);
  }
}
