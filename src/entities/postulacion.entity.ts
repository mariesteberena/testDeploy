import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Cuidador } from './cuidador.entity';
import { Usuario } from './usuario.entity';

@Entity('Postulaciones')
export class Postulacion {
  @PrimaryGeneratedColumn()
  IdPostulacion: number;

  @Column({ type: 'int' })
  IdCuidador: number;

  @Column({ type: 'int' })
  IdFamilia: number;

  @Column({ type: 'int', nullable: true })
  IdSolicitud: number | null;

  @Column({ type: 'varchar', length: 20, default: 'pendiente' })
  Estado: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  Mensaje: string;

  @CreateDateColumn()
  FechaAlta: Date;

  @ManyToOne(() => Cuidador, (cuidador) => cuidador.postulaciones)
  @JoinColumn({ name: 'IdCuidador' })
  cuidador: Cuidador;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'IdFamilia' })
  familia: Usuario;
}

