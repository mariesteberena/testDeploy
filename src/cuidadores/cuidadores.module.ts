import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CuidadoresController } from './cuidadores.controller';
import { CuidadoresService } from './cuidadores.service';
import { Cuidador } from '../entities/cuidador.entity';
import { Usuario } from '../entities/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cuidador, Usuario])],
  controllers: [CuidadoresController],
  providers: [CuidadoresService],
  exports: [CuidadoresService],
})
export class CuidadoresModule {}

