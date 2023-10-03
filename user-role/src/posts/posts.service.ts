import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Posts } from './models/post.model';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class PostsService {

  constructor(@InjectModel(Posts) private readonly postRepo: typeof Posts, private readonly fileService: FilesService) { }

  async create(createPostDto: CreatePostDto,image:any) {
    const fileName = await this.fileService.createFile(image);
    const post = await this.postRepo.create({...createPostDto,image:fileName})
    return post
  }

  findAll() {
    return `This action returns all posts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
