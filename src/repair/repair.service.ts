import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class RepairService {
  constructor(private prismaService: PrismaService) { }
  async create(createRepairDto: any) {
    const timestamp = Date.now(); // Lấy timestamp hiện tại
    const randomValue = Math.floor(Math.random() * 1000); // Giá trị ngẫu nhiên
    const orderCode = `ORD-${timestamp}-${randomValue}`;
    createRepairDto.orderCode = orderCode
    try {
      const repair = await this.prismaService.repair.create({
        data: createRepairDto, include: {
          status: true,
          worker: true
        }
      })
      return repair
    } catch (error) {
      return error

    }
  }

  async findAll() {
    try {
      return await this.prismaService.repair.findMany({
        include: {
          status: true,
          worker: true
        }
      })
    } catch (error) {

    }
  }

  findOne(id: number) {
    return `This action returns a #${id} repair`;
  }

  async update(id: number, updateRepairDto: any) {
    return await this.prismaService.repair.update({
      where: { id },
      data: updateRepairDto,
      include: {
        status: true,
        worker: true
      }
    });
  }

  remove(id: number) {
    return `This action removes a #${id} repair`;
  }
}
