import { Injectable } from '@nestjs/common';
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
        ...createOrderDto.map((cart) =>
          this.prismaService.cart.update({
            where: {
              id: cart.cartId
            },
            data: {
              statusId: 5,
            },
          }),
        ),
      ]);
      console.log(transaction);
    } catch (error) {
      console.log(error);
    }
  }

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    return this.prismaService.order.update({where: {id}, data: {statusId: 6}})
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
