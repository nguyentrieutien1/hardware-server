import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Put, Session } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}
  
  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createCartDto: CreateCartDto, @Session() session, @Request() req) {
    const ipAddress = req.connection.remoteAddress;
    console.log(ipAddress);
    return
    
    try {
    return this.cartService.create(req?.user?.id, createCartDto);
    } catch (error) {
      console.log(error);
      
    }
  }
  
  @Get()
  findAll() {
    return this.cartService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.update(+id, updateCartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartService.remove(+id);
  }
}
