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
    // const requiredRoles = this.reflector.getAllAndOverride<Role>(ROLES_KEY, [ //la anotación <> implica que lo que se devuelva sea de ese tipo especifico.
    //   context.getHandler(),
    //   context.getClass(),
    // ]);

    // if (!requiredRoles) {
    //   return true;
    // }

    // const { user } = context.switchToHttp().getRequest();

    // if (user.role === Role.ADMIN) { 
    //   return true
    // } //esto se coloca aqui xq este es el guard que vigila que role tiene el usuario que intenta ingresar

    // return user.role === requiredRoles;

    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [ // Cambia a Role[] para recibir el array
      context.getHandler(),
      context.getClass(),
    ]);

    console.log('Roles Requeridos por el Decorador (en Guard):', requiredRoles); 

    // Si no hay roles requeridos en la metadata, se permite el acceso (endpoint público o abierto a todos)
    if (!requiredRoles || requiredRoles.length === 0) { //ahora es asi por el array
      console.log('No hay roles requeridos. Acceso permitido.'); 
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    console.log('Usuario Autenticado (del Request en Guard):', user); 

    // Validar si el usuario existe y tiene un rol
    if (!user || !user.role) {
      console.log('Usuario o rol no definido. Acceso denegado (403).'); 
      return false; // No hay usuario o no tiene rol, denegar acceso
    }

    
    if (user.role === Role.ADMIN) { // Lógica para el rol de ADMIN (siempre tiene acceso total)
      console.log('Usuario es ADMIN. Acceso permitido.'); 
      return true;
    }

    // Verificar si el rol del usuario está incluido en los roles requeridos
    const hasRequiredRole = requiredRoles.some((role) => user.role === role); //esta es la implementacion mas robusta y estandar
    console.log(`Rol del Usuario: ${user.role}. ¿Tiene rol requerido (${requiredRoles.join(', ')}): ${hasRequiredRole}`); 

    return hasRequiredRole;
  };  
};
