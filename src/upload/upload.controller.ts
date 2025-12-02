import {
  Controller,
  Post,
  Delete,
  UseInterceptors,
  UploadedFile,
  Param,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import * as fs from 'fs';

@Controller('upload')
export class UploadController {
  @Post('image')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          // Ruta correcta al directorio de imágenes del frontend
          const frontendPath = join(process.cwd(), '..', 'Tpe-CuidAr', 'public', 'Imagenes');
          
          if (!fs.existsSync(frontendPath)) {
            fs.mkdirSync(frontendPath, { recursive: true });
          }
          cb(null, frontendPath);
        },
        filename: (req, file, cb) => {

          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${uniqueSuffix}${ext}`;
          cb(null, filename);
        },
      }),
      limits: {
        fileSize: 5 * 1024 * 1024,
      },
      fileFilter: (req, file, cb) => {

        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp)$/)) {
          return cb(
            new BadRequestException('Solo se permiten archivos de imagen'),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No se proporcionó ningún archivo');
    }


    const imagePath = `/Imagenes/${file.filename}`;

    return {
      success: true,
      message: 'Imagen subida exitosamente',
      path: imagePath,
      filename: file.filename,
    };
  }

  @Delete('image/:filename')
  async deleteImage(@Param('filename') filename: string) {
    try {
      const frontendPath = join(process.cwd(), '..', 'Tpe-CuidAr', 'public', 'Imagenes');
      const filePath = join(frontendPath, filename);

      if (fs.existsSync(filePath)) {

        fs.unlinkSync(filePath);
        return {
          success: true,
          message: 'Imagen eliminada exitosamente',
        };
      } else {
        throw new BadRequestException('El archivo no existe');
      }
    } catch (error) {
      throw new BadRequestException('Error al eliminar la imagen');
    }
  }
}
