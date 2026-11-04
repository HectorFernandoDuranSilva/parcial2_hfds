import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recinto } from './recinto.entity';
import { EventoCultural } from '../eventos/evento-cultural.entity';
import { RecintosController } from './recintos.controller';
import { RecintosService } from './recintos.service';

@Module({
  imports: [TypeOrmModule.forFeature([Recinto, EventoCultural])],
  controllers: [RecintosController], providers: [RecintosService], exports: [RecintosService],
})
export class RecintosModule {}

