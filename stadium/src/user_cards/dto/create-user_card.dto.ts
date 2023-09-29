import { IsNumber, IsNotEmpty, IsString, Max } from "class-validator";

export class CreateUserCardDto {
    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @IsString()
    @IsNotEmpty()
    name: string;
    
    @IsString()
    @IsNotEmpty()
    phone: string;
    
    @IsNumber()
    @IsNotEmpty()
    @Max(16)
    number: number;
    
    @IsNumber()
    @IsNotEmpty()
    @Max(2)
    year: number;
    
    @IsNumber()
    @IsNotEmpty()
    @Max(2)
    month: number;
}
