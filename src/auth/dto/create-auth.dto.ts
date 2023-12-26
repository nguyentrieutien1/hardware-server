import {
  IsNotEmpty,
  IsEmail,
  MinLength,
  Matches,
} from 'class-validator';
import { Match } from '../decorators/register.dto';
export class CreateAccountDto {
  @IsNotEmpty()
  fullName: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  address: string;
  @IsNotEmpty()
  sex: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  roleId: never | number = 3;

  @IsNotEmpty()
  birthday: string;

  @IsNotEmpty()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    message: 'Mật khẩu quá yếu, hãy nhập lại !',
  })
  password: string;

  @Match('password', { message: 'Mật khẩu không khớp' })
  confirmPassword: string;
}
