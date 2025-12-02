import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Usuario } from './usuario.entity';
import { Postulacion } from './postulacion.entity';

@Entity('Cuidador')
export class Cuidador {
  @PrimaryGeneratedColumn()
  IdCuidador: number;

  @Column({ type: 'int', unique: true })
  IdUsuario: number;

  @Column({ type: 'varchar', length: 20, nullable: true })
  Telefono: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  Ubicacion: string;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  Descripcion: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  TipoCuidado: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true, default: 0 })
  TarifaPorHora: number;

  @Column({ type: 'int', nullable: true, default: 0 })
  AnosExperiencia: number;

  @Column({ type: 'decimal', precision: 3, scale: 2, nullable: true, default: 0 })
  Calificacion: number;

  @Column({ type: 'varchar', length: 20, default: 'activo' })
  Estado: string;

  @CreateDateColumn()
  FechaCreacion: Date;

  @UpdateDateColumn()
  FechaActualizacion: Date;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'IdUsuario' })
  usuario: Usuario;

  @OneToMany(() => Postulacion, (postulacion) => postulacion.cuidador)
  postulaciones: Postulacion[];
}

