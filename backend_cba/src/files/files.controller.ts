// src/files/files.controller.ts
import {
  Controller,
  Post,
  Get,
  Param,
  UseInterceptors,
  UploadedFile,
  Res,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { existsSync } from 'fs';
import { join, resolve } from 'path';
import { FilesService } from './files.service';
import { File } from './entities/file.entity';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', FilesService.getMulterConfig()))
  public async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<File> {
    if (!file) {
      throw new BadRequestException('No se proporcionó ningún archivo');
    }

    return {
      message: 'Archivo subido exitosamente',
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
    };
  }

  @Get(':filename')
  public async getFile(@Param('filename') filename: string, @Res() res: Response) {
    try {
      const uploadsPath = this.filesService.getStaticPath();
      const filePath = resolve(uploadsPath, filename);

      if (!existsSync(filePath)) {
        throw new BadRequestException('Archivo no encontrado');
      }

      return res.sendFile(filename, { root: resolve(uploadsPath) });

    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Error al obtener el archivo');
    }
  }
}