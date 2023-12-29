import { IsNotEmpty } from "class-validator";
export class CreateProductDto {
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    description: string;
    @IsNotEmpty()
    price: number;
    stock: number;
    @IsNotEmpty()
    images?: object;
}
