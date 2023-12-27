import { BadRequestException, Injectable, Request } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-auth.dto';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}
  async register(createAccountDto: CreateAccountDto) {
    try {
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
      return this.prisma.account.create({
        data: createAccountDto,
        include: { role: true },
      });
    } catch (error) {
      console.log(error);
    }
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
  async checkIsLogin(req: Request): Promise<any> {
    try {
      if (!req.headers) {
        throw new BadRequestException('Cookie not found');
      }
      const access_token = req.headers['authorization'].split(' ')[1];
      const decodedToken = this.jwtService.verify(access_token, {
        secret: jwtConstants.secret,
      });
      const { id } = decodedToken;
      return await this.prisma.account.findUnique({
        where: { id },
        include: {
          cart: {
            where: {
              statusId: 4
            },
            include: {
              product: {
                include: {
                  images: true,
                },
              },
            },
            orderBy: {
              id: 'desc',
            },
          },
          order: {
            where: {
              statusId: 1
            },
            include: {
              cart: {
                include: {
                  product: {
                    include: {
                      images: true,
                    },
                  },
                },
              },
              account: true
            },
            orderBy: {
              id: 'desc',
            },
          },
        },
      });
    } catch (error) {
      throw new BadRequestException('Cookie has expired');
    }
  }
}
