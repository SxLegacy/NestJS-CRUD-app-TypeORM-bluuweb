import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    
    try {
      return await this.userRepository.save(createUserDto)
    
    } catch (error) {
      console.log('ERROR create user')
    }
    return 'This action adds a new user'
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOneBy({ email })
  }

  async findByEmailWithPassword(email: string) { //este n.metodo es xq se hizo select en entity, findOneByEmail ahora no envia el password
    return await this.userRepository.findOne({
      where: { email }, 
      select: ['id', 'password','name','email','role'],
    });
  }

  async findAll() {
    return await this.userRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
