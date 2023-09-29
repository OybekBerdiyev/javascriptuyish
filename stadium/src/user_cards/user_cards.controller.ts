import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { UserCardsService } from './user_cards.service';
import { CreateUserCardDto } from './dto/create-user_card.dto';
import { UpdateUserCardDto } from './dto/update-user_card.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';


@ApiTags("User Card")
@Controller('user-cards')
export class UserCardsController {
  constructor(private readonly userCardsService: UserCardsService) {}

  @ApiOperation({summary: "Userga card qo'shish"})
  @Post()
  create(@Body() createUserCardDto: CreateUserCardDto) {
    return this.userCardsService.create(createUserCardDto);
  }

  @Get()
  @ApiOperation({summary: "barcha kartalarni ko'rish"})
  findAll() {
    return this.userCardsService.findAll();
  }
  
  @ApiOperation({summary: "bitta kartani ko'rish"})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userCardsService.findOne(+id);
  }
  
  @ApiOperation({summary: "bitta kartani Update qilish"})
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserCardDto: UpdateUserCardDto) {
    return this.userCardsService.update(+id, updateUserCardDto);
  }
  
  @ApiOperation({summary: "bitta kartani delete qilish"})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userCardsService.remove(+id);
  }
}
