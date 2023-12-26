import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Roles } from 'src/auth/roles.decorator';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  
  // @UseGuards(LocalAuthGuard)
  // @Roles(['SUPER_ADMIN', ])
  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    delete createProductDto.images
    const product = await this.productService.create(createProductDto);
    return product;
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
