import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BreedsModule } from './breeds/breeds.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.example',//importantisimo perdi 3 horas

    }),

    // (() => {
    //   console.log('--- Variables de Entorno (Debugging) ---');
    //   console.log('POSTGRES_HOST:', process.env.POSTGRES_HOST);
    //   console.log('POSTGRES_PORT:', process.env.POSTGRES_PORT);
    //   console.log('POSTGRES_USERNAME:', process.env.POSTGRES_USERNAME);
    //   console.log('POSTGRES_PASSWORD:', process.env.POSTGRES_PASSWORD);
    //   console.log('POSTGRES_DATABASE:', process.env.POSTGRES_DATABASE);
    //   console.log('POSTGRES_SSL:', process.env.POSTGRES_SSL);
    //   console.log('------------------------------------');
    //   return null; // El return null es para que no sea un módulo real, solo un hack para el log
    // })(),

    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: [], // [__dirname +'/**/*.entity{.ts,.js}'] esto no se puso para no cargar manualmente cada entity
      autoLoadEntities: true,
      synchronize: true,
      ssl: process.env.POSTGRES_SSL === "true",
      extra: {
        ssl:
          process.env.POSTGRES_SSL === "true"
            ? {
                rejectUnauthorized: false,
              }
            : null,
      },
    }),
    CatsModule,
    BreedsModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
