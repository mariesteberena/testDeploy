import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth(): object {
    return {
      success: true,
      message: 'Servidor funcionando correctamente',
      database: 'Conectado',
      timestamp: new Date().toISOString(),
    };
  }
}







