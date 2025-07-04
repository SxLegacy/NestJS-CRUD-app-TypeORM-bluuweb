import { SetMetadata } from "@nestjs/common";
import { Role } from "../../common/enums/rol.enum";

//export const ROLES_KEY = 'roles' // esto es para estandarizar roles y evitar errores
//export const Roles = (role: Role) => SetMetadata(ROLES_KEY, role); //el tipo Role viene del enum

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles); //  Ahora acepta varios roles y los guarda como un array.