import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recinto } from './recintos/recinto.entity';
import { EventoCultural } from './eventos/evento-cultural.entity';
import { RecintosModule } from './recintos/recintos.module';
import { EventosModule } from './eventos/eventos.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT || 5432),
      username: process.env.DB_USERNAME, password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE, entities: [Recinto, EventoCultural],
      synchronize: process.env.DB_SYNCHRONIZE === 'true',
    }),
    RecintosModule, EventosModule,
  ],
})
export class AppModule {}

