import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Usuario } from '../entities/usuario.entity';
import { Rol } from '../entities/rol.entity';
import { Cuidador } from '../entities/cuidador.entity';
import { Postulacion } from '../entities/postulacion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Rol, Cuidador, Postulacion])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}







