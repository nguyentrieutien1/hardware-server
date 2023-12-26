import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { multerConfig } from 'src/config/multer.config';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [MulterModule.register(multerConfig)],
  controllers: [UploadController],
  providers: [UploadService, {provide: APP_INTERCEPTOR, useClass: MulterModule}],
})
export class UploadModule {}
