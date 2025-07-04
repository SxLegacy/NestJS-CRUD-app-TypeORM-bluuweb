import { Module } from '@nestjs/common';
import { BreedsService } from './breeds.service';
import { BreedsController } from './breeds.controller';
import { Breed } from './entities/breed.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Breed]),AuthModule],
  controllers: [BreedsController],
  providers: [BreedsService],
  exports: [TypeOrmModule.forFeature([Breed]), // ¡MUY IMPORTANTE! Exporta el Repository<Breed> para que otros módulos puedan usarlo
    BreedsService,],
})
export class BreedsModule {}
