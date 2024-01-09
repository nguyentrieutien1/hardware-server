import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()

export class CategoriesService {
  constructor(private prismaService: PrismaService) { }
  async create(createCategoryDto: any) {
    try {
      return await this.prismaService.categories.create({ data: createCategoryDto })
    } catch (error) {

      throw new BadRequestException(error)
    }
  }

  async findAll() {
    try {
      return await this.prismaService.categories.findMany({})
    } catch (error) {

      throw new BadRequestException(error)
    }
  }

  async findOne(id: number) {
    try {
      return await this.prismaService.categories.findUnique({ where: { id } })
    } catch (error) {

      throw new BadRequestException(error)
    }
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    try {
      return await this.prismaService.categories.update({ where: { id }, data: updateCategoryDto })
    } catch (error) {

      throw new BadRequestException(error)
    }
  }

  async remove(id: number) {
    try {
      return await this.prismaService.categories.delete({ where: { id } })
    } catch (error) {

      throw new BadRequestException(error)
    }
  }
}
