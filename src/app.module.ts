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

        const hasMySQLAddon = !!process.env.MYSQL_ADDON_HOST;
        
        const dbHost = process.env.MYSQL_ADDON_HOST || process.env.DB_HOST || 'localhost';
        const dbPort = parseInt(
          process.env.MYSQL_ADDON_PORT || 
          process.env.DB_PORT || 
          (hasMySQLAddon ? '3306' : '3306') 
        );
        const dbUser = process.env.MYSQL_ADDON_USER || process.env.DB_USERNAME || 'root';
        const dbPassword = process.env.MYSQL_ADDON_PASSWORD || process.env.DB_PASSWORD || '';
        const dbName = process.env.MYSQL_ADDON_DB || process.env.DB_DATABASE || 'cuidar';
        

        const hasSQLServerFormat = dbHost.includes('\\') || dbHost.includes('SQLEXPRESS');
        const isSQLServer = hasMySQLAddon ? false : (dbPort === 1433 || hasSQLServerFormat);
        const dbType = isSQLServer ? 'mssql' : 'mysql';
        
        const isRemoteConnection = dbHost !== 'localhost' && 
                                   !dbHost.startsWith('127.0.0.1') && 
                                   !dbHost.includes('::1') &&
                                   !dbHost.includes('\\');
        
        const hostParts = dbHost.split('\\');
        const hostName = hostParts[0];
        const instanceName = hostParts.length > 1 ? hostParts[1] : null;
        
        const config: any = {
          type: dbType,
          host: hostName,
          port: dbPort,
          username: dbUser,
          password: dbPassword,
          database: dbName,
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: false,
          logging: process.env.NODE_ENV === 'development',
          retryAttempts: 3,
          retryDelay: 5000,
        };
        
        if (isSQLServer) {
          config.options = {
            encrypt: isRemoteConnection,
            trustServerCertificate: true,
            enableArithAbort: true,
            connectTimeout: 60000,
          };
          if (instanceName) {
            config.options.instanceName = instanceName;
          }
          config.extra = {
            requestTimeout: 60000,
          };
        } else {
          config.extra = {
            connectionLimit: 10,
            connectTimeout: 60000,
          };
          if (isRemoteConnection) {
            config.ssl = {
              rejectUnauthorized: false,
            };
          }
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

