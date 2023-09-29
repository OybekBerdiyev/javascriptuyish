import { Injectable } from '@nestjs/common';
import { CreateUserCardDto } from './dto/create-user_card.dto';
import { UpdateUserCardDto } from './dto/update-user_card.dto';
import { InjectModel } from '@nestjs/sequelize';
import { UserCard } from './model/user_card.model';

@Injectable()
export class UserCardsService {
  constructor(@InjectModel(UserCard) private readonly userCardRepo: typeof UserCard) { }
  create(createUserCardDto: CreateUserCardDto) {
    return this.userCardRepo.create(createUserCardDto);
  }

  findAll() {
    return this.userCardRepo.findAll({include: {all:true}});;
  }

  findOne(id: number) {
    return this.userCardRepo.findByPk(id);
  }

  async update(id: number, updateUserCardDto: UpdateUserCardDto) {
    const upd = await this.userCardRepo.update(updateUserCardDto,{where:{id},returning:true})
    return upd[1][0];
  }

  async remove(id: number) {
    await this.userCardRepo.destroy({where:{id}})
    return {message: 'Succes'}
  }
}
