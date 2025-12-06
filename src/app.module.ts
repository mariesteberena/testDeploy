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
        // Prioridad: Variables de entorno del sistema > Variables del .env local
        // Soporta múltiples formatos:
        // - Clever Cloud/Heroku: MYSQL_ADDON_* (para MySQL en producción)
        // - Estándar: DB_HOST, DB_USERNAME, etc. (para desarrollo local)
        // - Desarrollo local: valores por defecto
        
        // Detectar si hay variables de addon MySQL (producción)
        const hasMySQLAddon = !!process.env.MYSQL_ADDON_HOST;
        
        // Obtener configuración con prioridad: Addon MySQL > Variables estándar > Valores por defecto
        const dbHost = process.env.MYSQL_ADDON_HOST || process.env.DB_HOST || 'localhost';
        const dbPort = parseInt(
          process.env.MYSQL_ADDON_PORT || 
          process.env.DB_PORT || 
          (hasMySQLAddon ? '3306' : '3306') // Default MySQL si hay addon, sino depende del puerto configurado
        );
        const dbUser = process.env.MYSQL_ADDON_USER || process.env.DB_USERNAME || 'root';
        const dbPassword = process.env.MYSQL_ADDON_PASSWORD || process.env.DB_PASSWORD || '';
        const dbName = process.env.MYSQL_ADDON_DB || process.env.DB_DATABASE || 'cuidar';
        
        // Detectar tipo de base de datos:
        // 1. Si hay variables MYSQL_ADDON_* -> MySQL
        // 2. Si el puerto es 1433 -> SQL Server
        // 3. Si el host tiene formato SERVER\INSTANCE -> SQL Server
        // 4. Por defecto -> MySQL
        const hasSQLServerFormat = dbHost.includes('\\') || dbHost.includes('SQLEXPRESS');
        const isSQLServer = hasMySQLAddon ? false : (dbPort === 1433 || hasSQLServerFormat);
        const dbType = isSQLServer ? 'mssql' : 'mysql';
        
        // Determinar si es conexión remota (no localhost)
        const isRemoteConnection = dbHost !== 'localhost' && 
                                   !dbHost.startsWith('127.0.0.1') && 
                                   !dbHost.includes('::1') &&
                                   !dbHost.includes('\\');
        
        // Parsear host para SQL Server (puede tener formato SERVER\INSTANCE)
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
        
        // Configuración específica para SQL Server
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
          // Configuración específica para MySQL
          config.extra = {
            connectionLimit: 10,
            connectTimeout: 60000,
          };
          // SSL solo para conexiones remotas MySQL
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

