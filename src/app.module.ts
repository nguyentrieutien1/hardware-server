import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from 'prisma/prisma.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/roles.guard';
import { ProductModule } from './product/product.module';
import { UploadModule } from './upload/upload.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
import { AccountModule } from './account/account.module';
import session from 'express-session';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    ProductModule,
    UploadModule,
    CartModule,
    OrderModule,
    AccountModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
