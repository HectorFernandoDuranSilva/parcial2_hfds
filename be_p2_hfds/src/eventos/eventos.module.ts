import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventoCultural } from './evento-cultural.entity';
import { EventosController } from './eventos.controller';
import { EventosService } from './eventos.service';
import { RecintosModule } from '../recintos/recintos.module';

@Module({
  imports: [TypeOrmModule.forFeature([EventoCultural]), RecintosModule],
  controllers: [EventosController], providers: [EventosService],
})
export class EventosModule {}

