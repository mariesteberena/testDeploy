import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as fs from 'fs';
import { join } from 'path';
import { Usuario } from '../entities/usuario.entity';
import { Rol } from '../entities/rol.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    @InjectRepository(Rol)
    private rolRepository: Repository<Rol>,
  ) {}

  async findAll() {
    const usuarios = await this.usuarioRepository.find({
      relations: ['rol'],
      order: { FechaCreacion: 'DESC' },
    });

    const users = usuarios.map((usuario) => ({
      idUsuario: usuario.IdUsuario,
      username: usuario.NombreUsuario,
      email: usuario.Email,
      firstName: usuario.Nombre,
      lastName: usuario.Apellido,
      role: usuario.rol.NombreRol,
      status: usuario.Estado,
      image: usuario.Imagen || null,
      fechaCreacion: usuario.FechaCreacion,
      fechaActualizacion: usuario.FechaActualizacion,
    }));

    return {
      success: true,
      users,
    };
  }

  async findOne(username: string) {
    const usuario = await this.usuarioRepository.findOne({
      where: { NombreUsuario: username },
      relations: ['rol'],
    });

    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return {
      success: true,
      user: {
        idUsuario: usuario.IdUsuario,
        username: usuario.NombreUsuario,
        email: usuario.Email,
        firstName: usuario.Nombre,
        lastName: usuario.Apellido,
        role: usuario.rol.NombreRol,
        status: usuario.Estado,
        image: usuario.Imagen || null,
      },
    };
  }

  async create(createUserDto: CreateUserDto) {

    const existingUser = await this.usuarioRepository.findOne({
      where: [
        { NombreUsuario: createUserDto.username },
        { Email: createUserDto.email },
      ],
    });

    if (existingUser) {
      throw new ConflictException('El nombre de usuario o email ya existe');
    }


    const rol = await this.rolRepository.findOne({
      where: { NombreRol: createUserDto.role },
    });

    if (!rol) {
      throw new BadRequestException('Rol inválido');
    }


    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);


    const nuevoUsuario = this.usuarioRepository.create({
      NombreUsuario: createUserDto.username,
      Email: createUserDto.email,
      Nombre: createUserDto.firstName,
      Apellido: createUserDto.lastName,
      Contraseña: hashedPassword,
      IdRol: rol.IdRol,
      Estado: 'activo',
      Imagen: createUserDto.image || null,
    });

    const usuarioGuardado = await this.usuarioRepository.save(nuevoUsuario);

    return {
      success: true,
      message: 'Usuario creado exitosamente',
      user: {
        idUsuario: usuarioGuardado.IdUsuario,
        username: usuarioGuardado.NombreUsuario,
        email: usuarioGuardado.Email,
        firstName: usuarioGuardado.Nombre,
        lastName: usuarioGuardado.Apellido,
        role: createUserDto.role,
        status: usuarioGuardado.Estado,
        image: usuarioGuardado.Imagen || null,
      },
    };
  }

  async update(username: string, updateUserDto: UpdateUserDto) {

    const usuario = await this.usuarioRepository.findOne({
      where: { NombreUsuario: username },
    });

    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }
    


    if (updateUserDto.username && updateUserDto.username !== username) {
      const existingUser = await this.usuarioRepository.findOne({
        where: { NombreUsuario: updateUserDto.username },
      });

      if (existingUser) {
        throw new ConflictException('El nombre de usuario ya existe');
      }

      usuario.NombreUsuario = updateUserDto.username;
    }

    if (updateUserDto.email !== undefined) usuario.Email = updateUserDto.email;
    if (updateUserDto.firstName !== undefined) usuario.Nombre = updateUserDto.firstName;
    if (updateUserDto.lastName !== undefined) usuario.Apellido = updateUserDto.lastName;
    if (updateUserDto.password !== undefined && updateUserDto.password !== '') {
      usuario.Contraseña = await bcrypt.hash(updateUserDto.password, 10);
    }
    if (updateUserDto.status !== undefined) {
      usuario.Estado = updateUserDto.status === 'active' ? 'activo' : 'inactivo';
    }
    

    if (updateUserDto.image !== undefined) {
      const imagenAnterior = usuario.Imagen;
      

      if (updateUserDto.image && updateUserDto.image !== imagenAnterior) {
        if (imagenAnterior && imagenAnterior.startsWith('/Imagenes/')) {
          try {
            const filename = imagenAnterior.replace('/Imagenes/', '');
            const frontendPath = join(process.cwd(), '..', 'Tpe-CuidAr', 'public', 'Imagenes');
            const filePath = join(frontendPath, filename);
            
            const defaultImages = ['Admin.png', 'Trabajador.jpg', 'Trabajadora1.avif', 'Familia.jpg', 'familia2.jpg'];
            if (fs.existsSync(filePath) && !defaultImages.includes(filename)) {
              fs.unlinkSync(filePath);
            }
          } catch (error) {
            console.error('Error al eliminar imagen anterior:', error);
          }
        }
      }
      

      usuario.Imagen = updateUserDto.image || null;
    }

    if (updateUserDto.role !== undefined && updateUserDto.role !== null && updateUserDto.role !== '') {
    
      const rol = await this.rolRepository.findOne({
        where: { NombreRol: updateUserDto.role },
      });

      if (!rol) {
        console.error(`[UPDATE USER] Rol no encontrado: ${updateUserDto.role}`);
        throw new BadRequestException(`Rol inválido: ${updateUserDto.role}`);
      }

      usuario.IdRol = rol.IdRol;
    } 

    if (updateUserDto.role !== undefined && updateUserDto.role !== null && updateUserDto.role !== '') {
      await this.usuarioRepository.update(
        { IdUsuario: usuario.IdUsuario },
        { IdRol: usuario.IdRol }
      );
    }
    
    const usuarioActualizado = await this.usuarioRepository.save(usuario);

    const usuarioCompleto = await this.usuarioRepository.findOne({
      where: { IdUsuario: usuarioActualizado.IdUsuario },
      relations: ['rol'],
    });
    
    if (!usuarioCompleto) {
      throw new BadRequestException('Error al recargar usuario después de actualizar');
    }
    
    
    if (!usuarioCompleto.rol) {
      throw new BadRequestException('Error al recargar usuario con rol');
    }

    if (!usuarioCompleto || !usuarioCompleto.rol) {
      throw new BadRequestException('Error al recargar usuario con rol');
    }

    return {
      success: true,
      message: 'Usuario actualizado exitosamente',
      user: {
        idUsuario: usuarioCompleto.IdUsuario,
        username: usuarioCompleto.NombreUsuario,
        email: usuarioCompleto.Email,
        firstName: usuarioCompleto.Nombre,
        lastName: usuarioCompleto.Apellido,
        role: usuarioCompleto.rol.NombreRol,
        status: usuarioCompleto.Estado,
        image: usuarioCompleto.Imagen || null,
      },
    };
  }

  async remove(username: string) {
    const usuario = await this.usuarioRepository.findOne({
      where: { NombreUsuario: username },
    });

    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }

    await this.usuarioRepository.remove(usuario);

    return {
      success: true,
      message: 'Usuario eliminado exitosamente',
    };
  }

  async toggleStatus(username: string) {
    const usuario = await this.usuarioRepository.findOne({
      where: { NombreUsuario: username },
      relations: ['rol'],
    });

    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }

    usuario.Estado = usuario.Estado === 'activo' ? 'inactivo' : 'activo';
    const usuarioActualizado = await this.usuarioRepository.save(usuario);

    return {
      success: true,
      message: `Usuario ${usuarioActualizado.Estado === 'activo' ? 'activado' : 'desactivado'} exitosamente`,
      user: {
        idUsuario: usuarioActualizado.IdUsuario,
        username: usuarioActualizado.NombreUsuario,
        email: usuarioActualizado.Email,
        firstName: usuarioActualizado.Nombre,
        lastName: usuarioActualizado.Apellido,
        role: usuarioActualizado.rol.NombreRol,
        status: usuarioActualizado.Estado,
        image: usuarioActualizado.Imagen || null,
      },
    };
  }

  async getTotalUsers(): Promise<number> {
    return await this.usuarioRepository.count();
  }

  async getUsersByRol(nombreRol: string): Promise<number> {
    const rol = await this.rolRepository.findOne({
      where: { NombreRol: nombreRol },
    });

    if (!rol) {
      return 0;
    }

    return await this.usuarioRepository.count({
      where: { IdRol: rol.IdRol },
    });
  }

  async getUsersByActivo(activo: boolean): Promise<number> {
    const estado = activo ? 'activo' : 'inactivo';
    return await this.usuarioRepository.count({
      where: { Estado: estado },
    });
  }

  async getDashboardStats() {
    const totalUsers = await this.getTotalUsers();
    const workers = await this.getUsersByRol('worker');
    const families = await this.getUsersByRol('family');
    const activeUsers = await this.getUsersByActivo(true);

    return {
      success: true,
      stats: {
        totalUsers,
        workers,
        families,
        activeUsers,
      },
    };
  }

}







