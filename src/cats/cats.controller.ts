import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Auth } from 'src/auth/decorators/auth.decorators';
import { Role } from 'src/common/enums/rol.enum';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { ActiveUserInterface } from 'src/common/interfaces/active-user.interface';
import { ApiBearerAuth, ApiCreatedResponse, ApiForbiddenResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('Cats')
@ApiBearerAuth()
@Auth(Role.USER)
@ApiUnauthorizedResponse({
  description: 'Unauthorized Bearer Auth',
})
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @ApiOperation({ summary: '=> Registrar el gato (teniendo un usuario).' })
  @Post('/register')
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  create(
    @Body() createCatDto: CreateCatDto, 
    @ActiveUser() user: ActiveUserInterface
  ) {
    return this.catsService.create(createCatDto, user);
  }

  @ApiOperation({ summary: '=> Buscar todos los gatos del usuario (Admin ve todos).' })
  @Get('/all')
  findAll(@ActiveUser() user: ActiveUserInterface) {
    return this.catsService.findAll(user);//siempre el argumento que se recibe se debe enviar por el metodo
  }

  @ApiOperation({ summary: '=> Buscar un gato del usuario.' })
  @Get(':id')
  findOne(@Param('id') id: number, @ActiveUser() user: ActiveUserInterface) {
    return this.catsService.findOne(id,user);
  }

  @ApiOperation({ summary: '=> Actualizar el gato (teniendo un usuario y el gato).' })
  @Patch('/update/:id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto, @ActiveUser() user: ActiveUserInterface) {
    return this.catsService.update(+id, updateCatDto,user);
  }

  @ApiOperation({ summary: '=> Eliminar el gato (soft) (teniendo un usuario y el gato).' })
  @Delete('/delete/:id')
  remove(@Param('id') id: string, @ActiveUser() user: ActiveUserInterface) {
    return this.catsService.remove(+id,user);
  }
}
