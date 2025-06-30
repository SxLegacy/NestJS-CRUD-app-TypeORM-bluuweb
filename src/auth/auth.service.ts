import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ){}

    async register({email,name,password}: RegisterDto){ //revisar: practica robusta y solida
        
        const user = await this.usersService.findOneByEmail(email);

        if(user) {
            throw new ConflictException('ERROR user registered'); // error 409 semanticamente mejor, ya existe item.
            
        };
        
        try { // el try es mejor aqui xq ya se verifico duplicidad, entonces el error seria otra cosa.
            return await this.usersService.create({
                email,
                name,
                password: await bcryptjs.hash(password, 10)
            });            
        } catch (error) {
            throw new BadRequestException('ERROR please try again');
        };
        
    };
        
    async login({email,password}: LoginDto){
        const user = await this.usersService.findByEmailWithPassword(email);
        const isPasswordValid = await bcryptjs.compare(password,user.password);

        if(!user) {
            throw new UnauthorizedException('ERROR, needs to be registered'); 
            
        };
        if(!isPasswordValid) {
            throw new UnauthorizedException('ERROR, check your password'); 
            
        };

        const payload = { 
            email: user.email,
            role: user.role,
        };

        const token = await this.jwtService.signAsync(payload);

        return {
            token,
            email,
            role: user.role,
        };
    };

    async profile ({email,role}: {email: string, role:string}) {

        // if (role !== 'admin' ) { //esta es una tecnica sencilla pero poco escalable, por eso se crea decorador y enum
        //     throw new UnauthorizedException('ERROR, check your access level');
        // }

        return await this.usersService.findOneByEmail(email);
    }
}
