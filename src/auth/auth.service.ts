import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-auth.dto';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}
  async create(createAccountDto: CreateAccountDto) {
    const { email, password } = createAccountDto;

    const accountExists = await this.prisma.account.findFirst({
      where: {
        email,
      },
    });
    if (accountExists) {
      throw new BadRequestException('Tài khoản đã tồn tại');
    }
    const saltOrRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltOrRounds);
    createAccountDto.password = hashPassword;
    delete createAccountDto.confirmPassword;
    return this.prisma.account.create({ data: createAccountDto , include: {role: true}});
  }

  async login(id: number, email: string) {
    const payload = { email, id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, password: string): Promise<any> {
    const account = await this.prisma.account.findFirst({ where: { email } });
    if (account && account.password) {
      const isMatch = await bcrypt.compare(password, account.password);
      if (isMatch) {
        const { password, ...result } = account;
        return result;
      }
      return null;
    }

    return null;
  }
}
