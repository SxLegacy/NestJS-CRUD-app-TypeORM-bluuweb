import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../decorators/roles.decorators';
import { Role } from '../../common/enums/rol.enum';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role>(ROLES_KEY, [ //la anotación <> implica que lo que se devuelva sea de ese tipo especifico.
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    if (user.role === Role.ADMIN) { 
      return true
    } //esto se coloca aqui xq este es el guard que vigila que role tiene el usuario que intenta ingresar

    return user.role === requiredRoles;
  };  
};
