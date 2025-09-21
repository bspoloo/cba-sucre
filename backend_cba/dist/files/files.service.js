"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesService = void 0;
// src/files/files.service.ts
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const multer_1 = require("multer");
const path_1 = require("path");
let FilesService = class FilesService {
    constructor() {
        // Crear directorio uploads si no existe
        if (!(0, fs_1.existsSync)('./uploads')) {
            (0, fs_1.mkdirSync)('./uploads', { recursive: true });
        }
    }
    getStaticPath() {
        return './uploads';
    }
    static getMulterConfig() {
        return {
            storage: (0, multer_1.diskStorage)({
                destination: './uploads',
                filename: (req, file, callback) => {
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                    const ext = (0, path_1.extname)(file.originalname);
                    callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
                },
            }),
            fileFilter: (req, file, callback) => {
                const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
                const ext = (0, path_1.extname)(file.originalname).toLowerCase();
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
};
exports.FilesService = FilesService;
exports.FilesService = FilesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], FilesService);
