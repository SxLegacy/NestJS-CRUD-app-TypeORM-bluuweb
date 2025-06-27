import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { Repository } from 'typeorm';
import { Breed } from '../breeds/entities/breed.entity';
import { ActiveUserInterface } from '../common/interfaces/active-user.interface';
import { Role } from '../common/enums/rol.enum';

@Injectable()
export class CatsService {

  constructor(
    @InjectRepository(Cat)
    private readonly catRepository: Repository<Cat>,
    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>
  ){ } 

  async create(createCatDto: CreateCatDto, user: ActiveUserInterface) {
    
    try {
      // return await this.catRepository.save(createCatDto); ahora al existir 2do modulo requiere ambas relaciones
      const breed = await this.validateBreed(createCatDto.breed)

      return await this.catRepository.save({
        ...createCatDto, 
        breed,
        userEmail: user.email, //aqui es donde enviamos el key que va a la DB
      });

    } catch (error) {
      console.log('ERROR create')
    }
  }

  async findAll(user: ActiveUserInterface) {
    if(user.role === Role.ADMIN) {
      return await this.catRepository.find();
    }

    try {
      return await this.catRepository.find({
        where: { userEmail: user.email }, //condicion; que el email que solicita sea reciba solo los asignados a él
      });

    } catch (error) {
      console.log('ERROR cant find')
    }    
    return await `This action returns all cats`;
  }

  async findOne(id: number, user: ActiveUserInterface) {
    const cat = await this.catRepository.findOneBy({id});

    try {

      this.validateOwnerShip(cat,user); //por principio de Solid, se creo metodo propio para validar.
      
      this.validateCat(cat);  

    } catch (error) {
      throw new BadRequestException('ERROR id not found')
    }
    return cat;
  }

  async update(id: number, updateCatDto: UpdateCatDto, user: ActiveUserInterface) {
    await this.findOne(id,user);
    
    try {
       //await this.catRepository.update(id,updateCatDto);
      
    } catch (error) {
      console.log('ERROR id not found')
    }

    return await this.catRepository.update( id, {
        ...updateCatDto, 
        breed: updateCatDto.breed ? await this.validateBreed(updateCatDto.breed) : undefined,//si me manda la raza hago la validación, sino es indefinida e ignora ese campo.
        userEmail: user.email, //aqui es donde enviamos el key que va a la DB
      });
  }

  async remove(id: number, user: ActiveUserInterface) {
    await this.findOne(id,user);
    return await this.catRepository.softDelete({id});
  };
  
  private validateOwnerShip(cat: Cat, user: ActiveUserInterface) {
    if(user.role !== Role.ADMIN && cat.userEmail !== user.email) {
        throw new UnauthorizedException('This Cat have another Owner');
      };
  };

  private validateCat(cat: Cat) {
    if(!cat) {
        throw new BadRequestException('Cat not found');
      };
  };

  private async validateBreed(breed: string) {
    const breedEntity = await this.breedRepository.findOneBy({ name: breed })

      if (!breedEntity) {
        throw new BadRequestException('Breed not found')
      }

      return breedEntity;
  };

}
