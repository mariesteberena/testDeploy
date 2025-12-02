import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rol } from '../entities/rol.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Rol)
    private rolRepository: Repository<Rol>,
  ) {}

  async findAll() {
    const roles = await this.rolRepository.find({
      where: { Estado: 'activo' },
      order: { NombreRol: 'ASC' },
    });

    return {
      success: true,
      roles: roles.map((rol) => ({
        idRol: rol.IdRol,
        nombreRol: rol.NombreRol,
        descripcion: rol.Descripcion,
        estado: rol.Estado,
      })),
    };
  }
}







