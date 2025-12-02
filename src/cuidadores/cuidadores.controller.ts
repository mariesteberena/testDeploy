import { Controller, Get, Put, Body, Param, ParseIntPipe } from '@nestjs/common';
import { CuidadoresService } from './cuidadores.service';

@Controller('cuidadores')
export class CuidadoresController {
  constructor(private readonly cuidadoresService: CuidadoresService) {}

  @Get('usuario/:idUsuario')
  async findByUsuario(@Param('idUsuario', ParseIntPipe) idUsuario: number) {
    const cuidador = await this.cuidadoresService.findByUsuario(idUsuario);
    return {
      success: true,
      cuidador,
    };
  }

  @Put('usuario/:idUsuario')
  async createOrUpdate(
    @Param('idUsuario', ParseIntPipe) idUsuario: number,
    @Body() data: any,
  ) {
    const cuidador = await this.cuidadoresService.createOrUpdate(idUsuario, {
      Telefono: data.telefono,
      Ubicacion: data.ubicacion,
      Descripcion: data.descripcion,
      TipoCuidado: data.tipoCuidado,
      TarifaPorHora: data.tarifaPorHora,
      AnosExperiencia: data.anosExperiencia,
      Calificacion: data.calificacion,
      Estado: data.estado || 'activo',
    });
    return {
      success: true,
      cuidador,
    };
  }
}

