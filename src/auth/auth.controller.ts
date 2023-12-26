import { Controller,  Post, Body, UseGuards, Request, Get, } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAccountDto } from './dto/create-auth.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthGuard } from './auth.guard';
@Controller('auth')
// @Roles(['SUPER_ADMIN', ])
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @Post('/register')
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.authService.register(createAccountDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req, @Body() accountLogin: {email: string, password: string}) {
    return await this.authService.login(req.user.id, accountLogin.email)
  }

  @UseGuards(AuthGuard)
  @Get('/check-is-login')
  async checkIsLogin(@Request() req: Request) {
    return await this.authService.checkIsLogin(req)
  }
}
