import { Injectable } from '@nestjs/common';
import { UpdateCartDto } from './dto/update-cart.dto';
import { PrismaService } from 'prisma/prisma.service';
@Injectable()
export class CartService {
  constructor(private prismaService: PrismaService) {}
  create(createCartDto: any) {
    try {
      return this.prismaService.cart.create({
        data: createCartDto,
        include: { product: { include: { images: true } }, account: true },
      });
    } catch (error) {
      console.log(error);
      
      
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
      console.log(error);
      
    }
  }
}
