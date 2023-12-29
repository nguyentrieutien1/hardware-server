import { IsNotEmpty } from "class-validator";

export class CreateUploadDto {
    @IsNotEmpty()
    url: JSON
    @IsNotEmpty()
    accountId: number
}
