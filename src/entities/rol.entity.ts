import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Usuario } from './usuario.entity';

@Entity('Roles')
export class Rol {
  @PrimaryGeneratedColumn()
  IdRol: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  NombreRol: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  Descripcion: string;

  @Column({ type: 'varchar', length: 10, default: 'activo' })
  Estado: string;

  @CreateDateColumn()
  FechaCreacion: Date;

  @UpdateDateColumn()
  FechaActualizacion: Date;

  @OneToMany(() => Usuario, (usuario) => usuario.rol)
  usuarios: Usuario[];
}







