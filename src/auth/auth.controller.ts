import { Controller,  Post, Body, UseGuards, Request, } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAccountDto } from './dto/create-auth.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { Roles } from './roles.decorator';

@Controller('auth')
// @Roles(['SUPER_ADMIN', ])
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @Post('/register')
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.authService.create(createAccountDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req, @Body() accountLogin: {email: string, password: string}) {
    return await this.authService.login(req.user.id, accountLogin.email)
  }
}
