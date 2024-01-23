import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  Request,
  Req,
  UploadedFile,
  Res,
  UploadedFiles,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { CreateUploadDto } from './dto/create-upload.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import formidable from 'formidable';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) { }

  @Post('')
  @UseInterceptors(
    FilesInterceptor('file', null, {
      storage: diskStorage({
        destination: './uploads', // Thư mục lưu trữ tệp
        filename: (req, file, callback) => {
          const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, uniqueName + extname(file.originalname));
        },
      }),
    })
  )
  async uploadFiles(@UploadedFiles() files) {
    const fileUrls = files.map(file => {
      return {
        url:  `https://maytinhthunguyen.com/api/upload/${file.filename}`,
      };
    });
    return fileUrls;
  }

  @Get()
  findAll() {
    return this.uploadService.findAll();
  }

  @Get(':filename')
  serveImage(@Param('filename') filename: string, @Res() res: any) {
    return res.sendFile(filename, { root: 'uploads/' });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUploadDto: UpdateUploadDto) {
    return this.uploadService.update(+id, updateUploadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.uploadService.remove(+id);
  }
}
