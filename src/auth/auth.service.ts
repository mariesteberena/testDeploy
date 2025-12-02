import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Usuario } from '../entities/usuario.entity';
import { Rol } from '../entities/rol.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    @InjectRepository(Rol)
    private rolRepository: Repository<Rol>,
  ) {}

  async login(username: string, password: string) {
    const usuario = await this.usuarioRepository.findOne({
      where: { NombreUsuario: username },
      relations: ['rol'],
    });

    if (!usuario) {
      throw new UnauthorizedException('Usuario o contraseña incorrectos');
    }

    if (usuario.Estado !== 'activo') {
      throw new UnauthorizedException('Usuario inactivo. Contacte al administrador.');
    }

    let isPasswordValid = false;
    
    if (usuario.Contraseña && (usuario.Contraseña.startsWith('$2a$') || usuario.Contraseña.startsWith('$2b$'))) {
      isPasswordValid = await bcrypt.compare(password, usuario.Contraseña);
    } else {
      isPasswordValid = usuario.Contraseña === password;
      
      if (isPasswordValid) {
        try {
          const hashedPassword = await bcrypt.hash(password, 10);
          usuario.Contraseña = hashedPassword;
          await this.usuarioRepository.save(usuario);
        } catch (error) {
          console.error('Error al hashear contraseña:', error);
        }
      }
    }
    
    if (!isPasswordValid) {
      throw new UnauthorizedException('Usuario o contraseña incorrectos');
    }

    return {
      success: true,
      message: 'Login exitoso',
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

  async getUserByUsername(username: string) {
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
}







