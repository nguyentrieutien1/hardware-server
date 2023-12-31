import { PartialType } from '@nestjs/mapped-types';
import { CreateAccountDto } from './create-account.dto';
import { IsEmail, IsIn, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class UpdateAccountDto extends PartialType(CreateAccountDto) {
  @IsNotEmpty()
  fullName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  @IsIn(['male', 'female'], { message: 'Giới tính phải là Nam hoặc Nữ !' })
  sex: 'male' | 'female';

  @IsNotEmpty()
  @IsPhoneNumber('VN', { message: 'Đảm bảo số điện thoại nhập chính xác !' })
  phone: string;

  @IsNotEmpty()
  birthday: string;
}
