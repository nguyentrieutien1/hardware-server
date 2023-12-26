import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [JwtModule, PrismaModule],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
