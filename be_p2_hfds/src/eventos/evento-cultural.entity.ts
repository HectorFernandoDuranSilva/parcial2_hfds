import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Auditoria } from '../common/auditoria.entity';
import { Recinto } from '../recintos/recinto.entity';

export enum EstadoEvento {
  Programado = 'Programado',
  Agotado = 'Agotado',
  Cancelado = 'Cancelado',
}

@Entity('eventos_culturales')
export class EventoCultural extends Auditoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  id_recinto: number;

  @ManyToOne(() => Recinto, { nullable: false, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'id_recinto' })
  recinto: Recinto;

  @Column({ length: 150 })
  titulo: string;

  @Column({ length: 100 })
  artista_principal: string;

  @Column({ type: 'integer' })
  duracion_minutos: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio_entrada: string;

  @Column({ type: 'date' })
  fecha_evento: string;

  @Column({ type: 'enum', enum: EstadoEvento })
  estado: EstadoEvento;
}

