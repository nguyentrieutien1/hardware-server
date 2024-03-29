import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private prismaService: PrismaService) { }
  async create(createOrderDto: any) {

    const newOrder = createOrderDto.map(order => {
      const timestamp = Date.now(); // Lấy timestamp hiện tại
      const randomValue = Math.floor(Math.random() * 1000); // Giá trị ngẫu nhiên
      const orderCode = `ORD-${timestamp}-${randomValue}`;
      order.orderCode = orderCode
      return order;
    })
    let transaction;
    try {
      transaction = await this.prismaService.$transaction([
        this.prismaService.order.createMany({
          data: newOrder,
        }),
      ]);
      return newOrder;
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
          product: true,
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
    try {
      return await this.prismaService.order.update({
        where: { id },
        data: { statusId: updateOrderDto?.statusId },
        include: {
          account: true,
          product: true,
          cart: {
            include: {
              product: {
                include: {
                  images: true
                }
              }
            }
          },
          status: true
        }
      });
    } catch (error) {
      console.log(error);

      throw new BadRequestException(error);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
  async search(data) {
    if (data?.orderCode) {
      const orderProduct = await this.prismaService.order.findFirst({
        where: {
          orderCode: data?.orderCode
        },
        include: {
          status: true,
          product: true,
        }

      })
      if (orderProduct) {
        return orderProduct
      }
      else {
        const orderRepair = await this.prismaService.repair.findFirst({
          where: {
            orderCode: data?.orderCode,
          },
          include: {
            status: true,
            
          }
        })
        return orderRepair
      }
    }

  }
}
