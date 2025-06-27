import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';
import { Request } from 'express';
import { Roles } from './decorators/roles.decorators';
import { RolesGuard } from './guard/roles.guard';
import { Role } from '../common/enums/rol.enum';
import { Auth } from './decorators/auth.decorators';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { ActiveUserInterface } from 'src/common/interfaces/active-user.interface';

interface RequestWithUser extends Request { //deberia tener su propia carpeta
    user: { 
        email: string; 
        role: string; 
    };
};

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
    ){}

    @Post('register')
    register(
        @Body()
        registerDto: RegisterDto
    ){
        return this.authService.register(registerDto);
    } 
    
    @Post('login')
    login(
        @Body()
        loginDto: LoginDto
    ){
        return this.authService.login(loginDto);
    }

    @Get('profile')
    @Auth(Role.ADMIN)
    profile(
        @ActiveUser() user: ActiveUserInterface //me parece enredado, revisar mejor codrr
    ) { // el @Request se llevo a @Req y luego a interface // luego se hizo @ActiveUser
    //return req.user;
    
    return this.authService.profile(user)
    }
}
