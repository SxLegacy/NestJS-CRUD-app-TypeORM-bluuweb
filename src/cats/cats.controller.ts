import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Auth } from 'src/auth/decorators/auth.decorators';
import { Role } from 'src/common/enums/rol.enum';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { ActiveUserInterface } from 'src/common/interfaces/active-user.interface';
import { ApiBearerAuth, ApiCreatedResponse, ApiForbiddenResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('Cats')
@ApiBearerAuth()
@Auth(Role.USER)
@ApiUnauthorizedResponse({
  description: 'Unauthorized Bearer Auth',
})
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

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

  @Get('/all')
  findAll(@ActiveUser() user: ActiveUserInterface) {
    return this.catsService.findAll(user);//siempre el argumento que se recibe se debe enviar por el metodo
  }

  @Get(':id')
  findOne(@Param('id') id: number, @ActiveUser() user: ActiveUserInterface) {
    return this.catsService.findOne(id,user);
  }

  @Patch('/update/:id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto, @ActiveUser() user: ActiveUserInterface) {
    return this.catsService.update(+id, updateCatDto,user);
  }

  @Delete('/delete/:id')
  remove(@Param('id') id: string, @ActiveUser() user: ActiveUserInterface) {
    return this.catsService.remove(+id,user);
  }
}
