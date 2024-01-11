import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private prismaService: PrismaService) { }
  async create(createPostDto: CreatePostDto) {
    try {
      return await this.prismaService.post.create({ data: createPostDto })
    } catch (error) {

      throw new BadRequestException(error)
    }
  }

  async findAll() {
    try {
      return await this.prismaService.post.findMany({})
    } catch (error) {

      throw new BadRequestException(error)
    }
  }

  async findOne(id: number) {
    try {
      return await this.prismaService.post.findFirst({ where: { id } })
    } catch (error) {

      throw new BadRequestException(error)
    }
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    try {
      return await this.prismaService.post.update({ where: { id }, data: updatePostDto })
    } catch (error) {

      throw new BadRequestException(error)
    }
  }

  async remove(id: number) {
    try {
      return await this.prismaService.post.delete({ where: { id } })
    } catch (error) {

      throw new BadRequestException(error)
    }
  }
}
