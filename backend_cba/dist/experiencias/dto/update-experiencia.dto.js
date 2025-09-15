"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateExperienciaDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_experiencia_dto_1 = require("./create-experiencia.dto");
class UpdateExperienciaDto extends (0, mapped_types_1.PartialType)(create_experiencia_dto_1.CreateExperienciaDto) {
}
exports.UpdateExperienciaDto = UpdateExperienciaDto;
