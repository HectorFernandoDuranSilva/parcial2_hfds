import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventoCultural } from './evento-cultural.entity';
import { RecintosService } from '../recintos/recintos.service';
import { CrearEventoDto, ActualizarEventoDto } from './evento.dto';

@Injectable()
export class EventosService {
  constructor(
    @InjectRepository(EventoCultural) private readonly eventos: Repository<EventoCultural>,
    private readonly recintos: RecintosService,
  ) {}

  findAll() {
    return this.eventos.find({ relations: { recinto: true }, order: { fecha_evento: 'ASC', id: 'ASC' } });
  }

  async findOne(id: number) {
    const evento = await this.eventos.findOne({ where: { id }, relations: { recinto: true } });
    if (!evento) throw new NotFoundException('Evento no encontrado');
    return evento;
  }

  async create(dto: CrearEventoDto) {
    await this.recintos.findOne(dto.id_recinto);
    return this.eventos.save(this.eventos.create({ ...dto, precio_entrada: dto.precio_entrada.toFixed(2) }));
  }

  async update(id: number, dto: ActualizarEventoDto) {
    const evento = await this.findOne(id);
    if (dto.id_recinto !== undefined) await this.recintos.findOne(dto.id_recinto);
    // La relación cargada debe quitarse para que no sobrescriba el nuevo id_recinto.
    const { recinto, ...datos } = evento;
    const cambios = { ...datos, ...dto, precio_entrada: dto.precio_entrada === undefined ? evento.precio_entrada : dto.precio_entrada.toFixed(2) };
    await this.eventos.save(cambios);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.eventos.softDelete(id);
  }
}

