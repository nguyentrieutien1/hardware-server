import { Injectable } from '@nestjs/common';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private prismaService: PrismaService) {}
  async create(createProductDto: any) {
    try {
      const imagesList = createProductDto.images;
      delete createProductDto.images;
      const product = await this.prismaService.product.create({
        data: createProductDto,
      });
      await this.prismaService.image.createMany({
        data: imagesList.map((image) => {
          return {
            productId: product.id,
            url: image.url,
          };
        }),
      });
      const images = await this.prismaService.image.findMany({
        where: { productId: product.id },
      });

      return {
        images,
        ...product,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async findAll() {
    try {
      return await this.prismaService.product.findMany({
        include: { images: true },
        orderBy: { id: 'desc' },
      });
    } catch (error) {
      console.log(error);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  async update(id: number, updateProductDto: any) {
    const imagesList = updateProductDto.images;
    delete updateProductDto.images;
    const product = await this.prismaService.product.update({
      data: updateProductDto,
      where: { id },
    });
    await this.prismaService.image.deleteMany({
      where: { productId: product.id },
    });
    await this.prismaService.image.createMany({
      data: imagesList.map((image) => {
        return {
          productId: product.id,
          url: image.url,
        };
      }),
    });
    const images = await this.prismaService.image.findMany({
      where: { productId: product.id },
    });

    return {
      images,
      ...product,
    };
  }

 async  remove(id: number) {
    try {
      return await this.prismaService.product.delete({where: {id}})
    } catch (error) {
      console.log(error);
      
    }
  }
}
