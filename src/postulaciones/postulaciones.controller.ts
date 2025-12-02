import { Controller, Get, Post, Delete, Body, UseGuards, Request, Param, ParseIntPipe } from '@nestjs/common';
import { PostulacionesService } from './postulaciones.service';
import { CreatePostulacionDto } from './dto/create-postulacion.dto';

@Controller('postulaciones')
export class PostulacionesController {
  constructor(private readonly postulacionesService: PostulacionesService) {}

  @Get('cuidador/:idCuidador')
  async findByCuidador(@Param('idCuidador', ParseIntPipe) idCuidador: number) {
    const postulaciones = await this.postulacionesService.findByCuidador(idCuidador);
    return {
      success: true,
      postulaciones,
    };
  }

  @Post()
  async create(@Body() body: any, @Request() req: any) {
    // En producción, obtener idCuidador del token JWT
    // Por ahora, asumimos que viene en el body
    const idCuidador = body.idCuidador;
    if (!idCuidador) {
      return {
        success: false,
        message: 'idCuidador es requerido',
      };
    }

    if (!body.idSolicitud) {
      return {
        success: false,
        message: 'idSolicitud es requerido',
      };
    }

    const createPostulacionDto: CreatePostulacionDto = {
      idFamilia: body.idFamilia,
      idSolicitud: body.idSolicitud,
      mensaje: body.mensaje,
    };
    
    const postulaciones = await this.postulacionesService.create(idCuidador, createPostulacionDto);
    return {
      success: true,
      postulaciones,
    };
  }

  @Delete('cuidador/:idCuidador/solicitud/:idSolicitud')
  async remove(
    @Param('idCuidador', ParseIntPipe) idCuidador: number,
    @Param('idSolicitud', ParseIntPipe) idSolicitud: number,
  ) {

    const postulaciones = await this.postulacionesService.remove(idCuidador, idSolicitud);
    return {
      success: true,
      postulaciones,
      message: 'Postulación eliminada exitosamente',
    };
  }
}

