import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Rol } from './rol.entity';
import { Postulacion } from './postulacion.entity';

@Entity('Usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  IdUsuario: number;

  @Column({ type: 'varchar', length: 100, unique: true })
  NombreUsuario: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  Email: string;

  @Column({ type: 'varchar', length: 100 })
  Nombre: string;

  @Column({ type: 'varchar', length: 100 })
  Apellido: string;

  @Column({ type: 'varchar', length: 255 })
  Contraseña: string;

  @Column({ type: 'int' })
  IdRol: number;

  @Column({ type: 'varchar', length: 10, default: 'activo' })
  Estado: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  Imagen: string;

  @CreateDateColumn()
  FechaCreacion: Date;

  @UpdateDateColumn()
  FechaActualizacion: Date;

  @ManyToOne(() => Rol, (rol) => rol.usuarios)
  @JoinColumn({ name: 'IdRol' })
  rol: Rol;

  @OneToMany(() => Postulacion, (postulacion) => postulacion.familia)
  postulaciones: Postulacion[];
}







