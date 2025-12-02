import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Postulacion } from '../entities/postulacion.entity';
import { Cuidador } from '../entities/cuidador.entity';
import { Usuario } from '../entities/usuario.entity';
import { CreatePostulacionDto } from './dto/create-postulacion.dto';

@Injectable()
export class PostulacionesService {
  constructor(
    @InjectRepository(Postulacion)
    private postulacionRepository: Repository<Postulacion>,
    @InjectRepository(Cuidador)
    private cuidadorRepository: Repository<Cuidador>,
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async findByCuidador(idCuidador: number) {
    const postulaciones = await this.postulacionRepository.find({
      where: { IdCuidador: idCuidador },
      relations: ['cuidador', 'familia'],
      order: { FechaAlta: 'DESC' },
    });

    const mapped = postulaciones.map((postulacion) => {
    
      
      return {
        idPostulacion: postulacion.IdPostulacion,
        idCuidador: postulacion.IdCuidador,
        idFamilia: postulacion.IdFamilia,
        idSolicitud: postulacion.IdSolicitud ?? null,
        estado: postulacion.Estado,
        mensaje: postulacion.Mensaje,
        familia: {
          idUsuario: postulacion.familia.IdUsuario,
          nombre: `${postulacion.familia.Nombre} ${postulacion.familia.Apellido}`,
          email: postulacion.familia.Email,
        },
        fechaAlta: postulacion.FechaAlta,
      };
    });

    

    return mapped;
  }

  async create(idCuidador: number, createPostulacionDto: CreatePostulacionDto) {

    const cuidador = await this.cuidadorRepository.findOne({
      where: { IdCuidador: idCuidador },
    });

    if (!cuidador) {
      throw new NotFoundException('Cuidador no encontrado');
    }

    const familia = await this.usuarioRepository.findOne({
      where: { IdUsuario: createPostulacionDto.idFamilia },
    });

    if (!familia) {
      throw new NotFoundException('Familia no encontrada');
    }

    const existingPostulacion = await this.postulacionRepository.findOne({
      where: {
        IdSolicitud: createPostulacionDto.idSolicitud,
        IdCuidador: idCuidador,
      },
    });

    if (existingPostulacion) {

      throw new ConflictException('Ya te has postulado a esta solicitud');
    }

    const idSolicitud = createPostulacionDto.idSolicitud ? Number(createPostulacionDto.idSolicitud) : null;
    
    if (!idSolicitud || isNaN(idSolicitud)) {
      throw new Error('IdSolicitud es requerido y debe ser un número válido');
    }
  

    const nuevaPostulacion = this.postulacionRepository.create({
      IdCuidador: idCuidador,
      IdFamilia: createPostulacionDto.idFamilia,
      IdSolicitud: idSolicitud,
      Mensaje: createPostulacionDto.mensaje || null,
      Estado: 'pendiente',
    });

 
    const saved = await this.postulacionRepository.save(nuevaPostulacion);
    

    return this.findByCuidador(idCuidador);
  }

  async remove(idCuidador: number, idSolicitud: number) {


    const postulacion = await this.postulacionRepository.findOne({
      where: {
        IdCuidador: idCuidador,
        IdSolicitud: idSolicitud,
      },
    });

    if (!postulacion) {
      throw new NotFoundException('Postulación no encontrada');
    }

    await this.postulacionRepository.remove(postulacion);
    

    return this.findByCuidador(idCuidador);
  }
}

