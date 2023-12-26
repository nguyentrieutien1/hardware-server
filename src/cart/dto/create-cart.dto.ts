import { IsNotEmpty } from 'class-validator';

export class CreateCartDto {
  @IsNotEmpty()
  accountId: number;
  @IsNotEmpty()
  productId: number;
  @IsNotEmpty()
  quantity: number;
}
