import { IsEmail, IsStrongPassword } from "class-validator";

export class LoginDto {
    @IsEmail()
    readonly email: string;
    @IsStrongPassword()
    password: string;
}
