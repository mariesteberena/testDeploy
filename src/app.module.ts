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
        const dbHost = process.env.MYSQL_ADDON_HOST;
        const dbPort = parseInt(process.env.MYSQL_ADDON_PORT || '3306');
        const dbUser = process.env.MYSQL_ADDON_USER;
        const dbPassword = process.env.MYSQL_ADDON_PASSWORD;
        const dbName = process.env.MYSQL_ADDON_DB;
    
        return {
          type: 'mysql',
          host: dbHost,
          port: dbPort,
          username: dbUser,
          password: dbPassword,
          database: dbName,
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: false,
          retryAttempts: 3,
          retryDelay: 5000,
          ssl: {
            rejectUnauthorized: false,
          },
        };
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

