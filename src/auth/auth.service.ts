import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  Request,
} from '@nestjs/common';
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
  ) { }
  async register(createAccountDto: CreateAccountDto) {
    try {
      const { email, password } = createAccountDto;

      const accountExists = await this.prisma.account.findFirst({
        where: {
          email,
        },
      });
      if (accountExists) {
        throw new HttpException('Tài khoản đã tồn tại', HttpStatus.CONFLICT);
      }
      const saltOrRounds = 10;
      const hashPassword = await bcrypt.hash(password, saltOrRounds);
      createAccountDto.password = hashPassword;
      delete createAccountDto.confirmPassword;
      const account = await this.prisma.account.create({
        data: createAccountDto,
        include: { role: true },
      });

       await this.prisma.image.create({
        data: {
          accountId: account.id,
          url: account.sex === 'male' ? 'https://files.tecnoblog.net/wp-content/uploads/2020/05/avatar-de-facebook-de-mark-zuckerberg-e1589902366337-700x460.png' : 'https://www.pvm.vn/wp-content/uploads/2020/09/facebook-avatar.jpg'
        }
      });
      return account;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async login(id: number, email: string) {
    const payload = { email, id };
    const account = await this.prisma.account.findUnique({
      where: { id },
      include: { role: true },
    });
    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '1d', secret: jwtConstants.secret }),
      role: account.role,
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
          image: true,
          role: true,
          cart: {
            where: {
              statusId: 4,
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
              OR: [
                { statusId: 7 },
                { statusId: 1 },
                { statusId: 2 },
              ]
            },
            include: {
              status: true,
              cart: {
                include: {
                  product: {
                    include: {
                      images: true,
                    },
                  },
                  status: true,
                },
              },
              account: true,
            },
            orderBy: {
              id: 'desc',
            },
          },
        },
      });
    } catch (error) {
      console.log(error);

      throw new BadRequestException('Cookie has expired');
    }
  }
}
