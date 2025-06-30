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
import { ApiBearerAuth, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
    ){}

    @ApiOperation({ summary: '=> Para registrar a un usuario.' })
    @Post('register')
    register(
        @Body()
        registerDto: RegisterDto
    ){
        return this.authService.register(registerDto);
    } 
    
    @ApiOperation({ summary: '=> Logear el usuario para obtener permisos.' })
    @Post('login')
    login(
        @Body()
        loginDto: LoginDto
    ){
        return this.authService.login(loginDto);
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: '=> Para verificar Perfil completo (solo admins).' })
    @Get('profile')
    @Auth(Role.ADMIN)
    profile(
        @ActiveUser() user: ActiveUserInterface //me parece enredado, revisar mejor codrr
    ) { // el @Request se llevo a @Req y luego a interface // luego se hizo @ActiveUser
    //return req.user;
    
    return this.authService.profile(user)
    }
}
