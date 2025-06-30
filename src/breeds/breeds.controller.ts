import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BreedsService } from './breeds.service';
import { CreateBreedDto } from './dto/create-breed.dto';
import { UpdateBreedDto } from './dto/update-breed.dto';
import { Auth } from 'src/auth/decorators/auth.decorators';
import { Role } from 'src/common/enums/rol.enum';
import { ApiBearerAuth, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('breeds')
//@Auth(Role.ADMIN) lo  comente para que se pueda registrar en el swagger
@ApiUnauthorizedResponse({
  description: 'Unauthorized Bearer Auth',
})
@Controller('breeds')
export class BreedsController {
  constructor(private readonly breedsService: BreedsService) {}

  @ApiOperation({ summary: '=> Ingresa una raza a la base de datos.' })
  @Post()
  create(@Body() createBreedDto: CreateBreedDto) {
    return this.breedsService.create(createBreedDto);
  }

  @ApiOperation({ summary: '=> Muestra todas las razas disponibles para gatos.' })
  @Get()
  findAll() {
    return this.breedsService.findAll();
  }

  @ApiOperation({ summary: '=> Muestra los datos de una raza especifica.' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.breedsService.findOne(id);
  }

  @ApiOperation({ summary: '=> Actualiza los datos de una raza.' })
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateBreedDto: UpdateBreedDto) {
    return this.breedsService.update(id, updateBreedDto);
  }

  @ApiOperation({ summary: '=> Elimina la raza especificada.' })
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.breedsService.remove(id);
  }
}
