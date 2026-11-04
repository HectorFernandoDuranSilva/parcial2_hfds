import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Auditoria } from '../common/auditoria.entity';

@Entity('recintos')
export class Recinto extends Auditoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 50 })
  ciudad: string;

  @Column({ type: 'integer', nullable: true })
  aforo_maximo: number | null;
}

