import { IsEmail, IsString, MinLength } from "class-validator"
import { Transform } from "class-transformer";


export class RegisterDto {

    @IsString()
    @MinLength(3)
    name: string;

    @Transform(({value})=> value.trim()) //limpia los caracteres en blanco
    @IsString()
    @MinLength(8)
    password: string
    
    @IsEmail()
    email: string
}