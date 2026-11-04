import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recinto } from './recinto.entity';
import { EventoCultural } from '../eventos/evento-cultural.entity';
import { CrearRecintoDto, ActualizarRecintoDto } from './recinto.dto';

@Injectable()
export class RecintosService {
  constructor(
    @InjectRepository(Recinto) private readonly recintos: Repository<Recinto>,
    @InjectRepository(EventoCultural) private readonly eventos: Repository<EventoCultural>,
  ) {}

  findAll() { return this.recintos.find({ order: { nombre: 'ASC', id: 'ASC' } }); }

  async findOne(id: number) {
    const recinto = await this.recintos.findOneBy({ id });
    if (!recinto) throw new NotFoundException('Recinto no encontrado');
    return recinto;
  }

  create(dto: CrearRecintoDto) { return this.recintos.save(this.recintos.create(dto)); }

  async update(id: number, dto: ActualizarRecintoDto) {
    const recinto = await this.findOne(id);
    return this.recintos.save(Object.assign(recinto, dto));
  }

  async remove(id: number) {
    await this.findOne(id);
    if (await this.eventos.countBy({ id_recinto: id })) {
      throw new ConflictException('Elimine primero los eventos del recinto');
    }
    await this.recintos.softDelete(id);
  }
}

