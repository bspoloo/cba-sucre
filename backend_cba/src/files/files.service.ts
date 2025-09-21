// src/files/files.service.ts
import { Injectable } from '@nestjs/common';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Request } from 'express';
import { FileFilterCallback } from 'multer';


@Injectable()
export class FilesService {
  constructor() {
    // Crear directorio uploads si no existe
    if (!existsSync('./uploads')) {
      mkdirSync('./uploads', { recursive: true });
    }
  }

  getStaticPath() {
    return './uploads';
  }

  public static getMulterConfig() {
    return {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req: Request, file: Express.Multer.File, callback: (error: Error | null, acceptFile: boolean) => void) => {
        const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
        const ext = extname(file.originalname).toLowerCase();

        if (!allowedExtensions.includes(ext)) {
          return callback(new Error('Solo se permiten imágenes (jpg, jpeg, png, gif)'), false);
        }

        const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!allowedMimeTypes.includes(file.mimetype)) {
          return callback(new Error('Tipo de archivo no permitido'), false);
        }

        callback(null, true);
      },
      limits: {
        fileSize: 15 * 1024 * 1024,
      },
    };
  }
}