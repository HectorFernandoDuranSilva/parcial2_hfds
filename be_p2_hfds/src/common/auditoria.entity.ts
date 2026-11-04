import { CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

export abstract class Auditoria {
  @CreateDateColumn({ type: 'timestamptz' })
  fecha_creacion: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  fecha_modificacion: Date;

  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  fecha_eliminacion: Date | null;
}

