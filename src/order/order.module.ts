import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [PrismaModule, JwtModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
