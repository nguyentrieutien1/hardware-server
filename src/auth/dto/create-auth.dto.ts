import {
  IsNotEmpty,
  IsEmail,
  MinLength,
  Matches,
  IsIn,
  IsPhoneNumber,
  IsDate,
} from 'class-validator';
import { Match } from '../decorators/register.dto';
export class CreateAccountDto {
  @IsNotEmpty()
  fullName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  @IsIn(['male', 'female'], {message: 'Giới tính phải là Nam hoặc Nữ !'})
  sex: 'male' | 'female';

  @IsNotEmpty()
  @IsPhoneNumber('VN', {message: 'Đảm bảo số điện thoại nhập chính xác !'})
  phone: string;

  @IsNotEmpty()
  roleId: never | number = 3;

  @IsNotEmpty()
  birthday: string;

  @IsNotEmpty()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    message: 'Mật khẩu phải chứa ít nhất 8 ký tự, bao gồm ít nhất một chữ thường, một chữ hoa và một chữ số',
  })
  password: string;

  @Match('password', { message: 'Mật khẩu không khớp' })
  confirmPassword: string;
}
