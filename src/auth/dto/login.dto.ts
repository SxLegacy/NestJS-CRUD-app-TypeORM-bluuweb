import { Transform } from "class-transformer";
import { IsEmail, IsString, MinLength } from "class-validator";

export class LoginDto {
    
    @Transform(({value})=> value.trim()) //limpia los caracteres en blanco
    @IsString()
    @MinLength(8)
    password: string
    
    @IsEmail()
    email: string
}