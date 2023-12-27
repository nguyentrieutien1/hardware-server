import { IsNotEmpty } from "class-validator";

export class CreateOrderDto {
    @IsNotEmpty()
    accountId: number
    @IsNotEmpty()
    cartId: number
}
