import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateCartDto } from './dto/update-cart.dto';
import { PrismaService } from 'prisma/prisma.service';
@Injectable()
export class CartService {
  constructor(private prismaService: PrismaService) {}
  async create(accountId, createCartDto: any) {
    console.log(accountId);
    
    try {
      const product = await this.prismaService.cart.findFirst({
        where: {
          productId: createCartDto.productId,
          statusId: 4,
          accountId
          
        },
      });
      if (product) {
        if (product.quantity > 0) {
          product.quantity += createCartDto?.quantity;
          return await this.prismaService.cart.update({
            data: product,
            where: { id: product.id },
          });
        }
      }
      return await this.prismaService.cart.create({
        data: {...createCartDto, accountId},
        include: { product: { include: { images: true } }, account: true },
      });
    } catch (error) {
      
      throw new BadRequestException(error)
    }
  }

  findAll() {
    return `This action returns all cart`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cart`;
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    
    try {
      return this.prismaService.cart.update({
        data: { quantity: updateCartDto.quantity },
        where: { id },
        include: {
          product: {
            include: {
              images: true,
            },
          },
        },
      });
    } catch (error) {}
  }
  remove(id: number) {
    try {
      return this.prismaService.cart.delete({ where: { id } });
    } catch (error) {
        throw new BadRequestException(error)
    }
  }
}
