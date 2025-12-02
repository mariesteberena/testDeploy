import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cuidador } from '../entities/cuidador.entity';
import { Usuario } from '../entities/usuario.entity';

@Injectable()
export class CuidadoresService {
  constructor(
    @InjectRepository(Cuidador)
    private cuidadorRepository: Repository<Cuidador>,
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async findByUsuario(idUsuario: number) {
    const cuidador = await this.cuidadorRepository.findOne({
      where: { IdUsuario: idUsuario },
      relations: ['usuario', 'usuario.rol'],
    });

    if (!cuidador) {
      return null;
    }

    return {
      idCuidador: cuidador.IdCuidador,
      idUsuario: cuidador.IdUsuario,
      telefono: cuidador.Telefono,
      ubicacion: cuidador.Ubicacion,
      descripcion: cuidador.Descripcion,
      tipoCuidado: cuidador.TipoCuidado,
      tarifaPorHora: cuidador.TarifaPorHora,
      anosExperiencia: cuidador.AnosExperiencia,
      calificacion: cuidador.Calificacion,
      estado: cuidador.Estado,
      usuario: {
        idUsuario: cuidador.usuario.IdUsuario,
        username: cuidador.usuario.NombreUsuario,
        email: cuidador.usuario.Email,
        firstName: cuidador.usuario.Nombre,
        lastName: cuidador.usuario.Apellido,
        role: cuidador.usuario.rol.NombreRol,
        status: cuidador.usuario.Estado,
        image: cuidador.usuario.Imagen,
      },
    };
  }

  async createOrUpdate(idUsuario: number, data: Partial<Cuidador>) {
    let cuidador = await this.cuidadorRepository.findOne({
      where: { IdUsuario: idUsuario },
    });

    if (!cuidador) {
      cuidador = this.cuidadorRepository.create({
        IdUsuario: idUsuario,
        ...data,
      });
    } else {
      Object.assign(cuidador, data);
    }

    const saved = await this.cuidadorRepository.save(cuidador);
    return this.findByUsuario(idUsuario);
  }

  async update(idCuidador: number, data: Partial<Cuidador>) {
    const cuidador = await this.cuidadorRepository.findOne({
      where: { IdCuidador: idCuidador },
    });

    if (!cuidador) {
      throw new NotFoundException('Cuidador no encontrado');
    }

    Object.assign(cuidador, data);
    const saved = await this.cuidadorRepository.save(cuidador);
    return this.findByUsuario(cuidador.IdUsuario);
  }
}

