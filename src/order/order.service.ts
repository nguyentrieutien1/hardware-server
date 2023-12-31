import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private prismaService: PrismaService) {}
  async create(createOrderDto: any) {
    let transaction;
    try {
      transaction = await this.prismaService.$transaction([
        this.prismaService.order.createMany({
          data: createOrderDto,
        }),
        // Update những product trong cart đã được order (statusId = 5), còn những sản phẩm trong giỏ hàng chưa được order (statusId = 4);
        ...createOrderDto.map((cart) =>
          this.prismaService.cart.update({
            where: {
              id: cart.cartId,
            },
            data: {
              statusId: 5,
            },
          }),
        ),
      ]);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findAll() {
    try {
      return await this.prismaService.order.findMany({
        include: {
          account: true,
          status: true,
          cart: { include: { product: true } },
        },
        orderBy: {
          id: 'desc',
        },
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  async update(id: number, updateOrderDto: any) {
    return this.prismaService.order.update({
      where: { id },
      data: { statusId: updateOrderDto?.statusId },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
