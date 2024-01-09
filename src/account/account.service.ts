import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class AccountService {
  constructor(private prismaService: PrismaService) {}
  async update(id: number, updateAccountDto: any) {
    const images = updateAccountDto?.images;
    delete updateAccountDto?.images
    const accountUpdated =  await this.prismaService.account.update({
      where: { id },
      data: updateAccountDto,
      include: {
        image: true
      }
    });
    const image = await this.prismaService.image.upsert({
      where: { id },
      update: { url: images },
      create: { url: images, account: {connect: {id}} },
    });
    accountUpdated.image =  image
    return accountUpdated;
  }
}
