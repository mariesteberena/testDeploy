import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { UploadModule } from './upload/upload.module';
import { CuidadoresModule } from './cuidadores/cuidadores.module';
import { PostulacionesModule } from './postulaciones/postulaciones.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        const dbHost = process.env.DB_HOST || 'localhost';
        const dbPort = parseInt(process.env.DB_PORT || '1433');
        const dbUser = process.env.DB_USERNAME || 'sa';
        const dbPassword = process.env.DB_PASSWORD || '';
        const dbName = process.env.DB_DATABASE || 'cuidar';


        const hostParts = dbHost.split('\\');
        const hostName = hostParts[0];
        const instanceName = hostParts.length > 1 ? hostParts[1] : null;

        const config: any = {
          type: 'mssql',
          host: hostName,
          port: dbPort,
          username: dbUser,
          password: dbPassword,
          database: dbName,
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: false,
          options: {
            encrypt: false,
            trustServerCertificate: true,
            enableArithAbort: true,
            connectTimeout: 60000,
          },
          extra: {
            requestTimeout: 60000,
          },
          retryAttempts: 3,
          retryDelay: 5000,
        };

        if (instanceName) {
          config.options.instanceName = instanceName;
        } 
          
        return config;
      },
    }),
    AuthModule,
    UsersModule,
    RolesModule,
    UploadModule,
    CuidadoresModule,
    PostulacionesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

