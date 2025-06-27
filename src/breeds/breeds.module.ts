import { Module } from '@nestjs/common';
import { BreedsService } from './breeds.service';
import { BreedsController } from './breeds.controller';
import { Breed } from './entities/breed.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Breed])],
  controllers: [BreedsController],
  providers: [BreedsService],
  exports: [TypeOrmModule.forFeature([Breed]), // ¡MUY IMPORTANTE! Exporta el Repository<Breed> para que otros módulos puedan usarlo
    BreedsService,],
})
export class BreedsModule {}
