import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): object {
    return {
      message: 'API de CuidAR',
      version: '1.0.0',
      endpoints: {
        health: '/health',
        auth: {
          login: 'POST /auth/login',
          getUser: 'GET /auth/user/:username',
        },
        users: {
          getAll: 'GET /users',
          getOne: 'GET /users/:username',
          create: 'POST /users',
          update: 'PUT /users/:username',
          delete: 'DELETE /users/:username',
          toggleStatus: 'PATCH /users/:username/toggle-status',
        },
      },
    };
  }

  @Get('health')
  getHealth(): object {
    return this.appService.getHealth();
  }
}







