"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEstudianteMateriaDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_estudiante_materia_dto_1 = require("./create-estudiante-materia.dto");
class UpdateEstudianteMateriaDto extends (0, swagger_1.PartialType)(create_estudiante_materia_dto_1.CreateEstudianteMateriaDto) {
}
exports.UpdateEstudianteMateriaDto = UpdateEstudianteMateriaDto;
