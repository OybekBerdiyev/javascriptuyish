import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty,IsEmail,IsString,IsStrongPassword} from 'class-validator';
export class CreateUserDto {
    @ApiProperty({example:'user1',description: "user's name"})
    @IsString()
    @IsNotEmpty()
    name: string;
    
    @ApiProperty({example:'user1@gmail.com',description: "user's email"})
    @IsEmail()
    email: string;
   
    @ApiProperty({example:'Uzbek!$st0n',description: "user's password"})
    @IsStrongPassword({minLength: 6})
    password: string;
}
