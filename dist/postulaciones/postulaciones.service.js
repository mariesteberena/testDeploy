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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostulacionesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const postulacion_entity_1 = require("../entities/postulacion.entity");
const cuidador_entity_1 = require("../entities/cuidador.entity");
const usuario_entity_1 = require("../entities/usuario.entity");
let PostulacionesService = class PostulacionesService {
    constructor(postulacionRepository, cuidadorRepository, usuarioRepository) {
        this.postulacionRepository = postulacionRepository;
        this.cuidadorRepository = cuidadorRepository;
        this.usuarioRepository = usuarioRepository;
    }
    async findByCuidador(idCuidador) {
        const postulaciones = await this.postulacionRepository.find({
            where: { IdCuidador: idCuidador },
            relations: ['cuidador', 'familia'],
            order: { FechaAlta: 'DESC' },
        });
        const mapped = postulaciones.map((postulacion) => {
            return {
                idPostulacion: postulacion.IdPostulacion,
                idCuidador: postulacion.IdCuidador,
                idFamilia: postulacion.IdFamilia,
                idSolicitud: postulacion.IdSolicitud ?? null,
                estado: postulacion.Estado,
                mensaje: postulacion.Mensaje,
                familia: {
                    idUsuario: postulacion.familia.IdUsuario,
                    nombre: `${postulacion.familia.Nombre} ${postulacion.familia.Apellido}`,
                    email: postulacion.familia.Email,
                },
                fechaAlta: postulacion.FechaAlta,
            };
        });
        return mapped;
    }
    async create(idCuidador, createPostulacionDto) {
        const cuidador = await this.cuidadorRepository.findOne({
            where: { IdCuidador: idCuidador },
        });
        if (!cuidador) {
            throw new common_1.NotFoundException('Cuidador no encontrado');
        }
        const familia = await this.usuarioRepository.findOne({
            where: { IdUsuario: createPostulacionDto.idFamilia },
        });
        if (!familia) {
            throw new common_1.NotFoundException('Familia no encontrada');
        }
        const existingPostulacion = await this.postulacionRepository.findOne({
            where: {
                IdSolicitud: createPostulacionDto.idSolicitud,
                IdCuidador: idCuidador,
            },
        });
        if (existingPostulacion) {
            throw new common_1.ConflictException('Ya te has postulado a esta solicitud');
        }
        const idSolicitud = createPostulacionDto.idSolicitud ? Number(createPostulacionDto.idSolicitud) : null;
        if (!idSolicitud || isNaN(idSolicitud)) {
            throw new Error('IdSolicitud es requerido y debe ser un número válido');
        }
        const nuevaPostulacion = this.postulacionRepository.create({
            IdCuidador: idCuidador,
            IdFamilia: createPostulacionDto.idFamilia,
            IdSolicitud: idSolicitud,
            Mensaje: createPostulacionDto.mensaje || null,
            Estado: 'pendiente',
        });
        const saved = await this.postulacionRepository.save(nuevaPostulacion);
        return this.findByCuidador(idCuidador);
    }
    async remove(idCuidador, idSolicitud) {
        const postulacion = await this.postulacionRepository.findOne({
            where: {
                IdCuidador: idCuidador,
                IdSolicitud: idSolicitud,
            },
        });
        if (!postulacion) {
            throw new common_1.NotFoundException('Postulación no encontrada');
        }
        await this.postulacionRepository.remove(postulacion);
        return this.findByCuidador(idCuidador);
    }
};
exports.PostulacionesService = PostulacionesService;
exports.PostulacionesService = PostulacionesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(postulacion_entity_1.Postulacion)),
    __param(1, (0, typeorm_1.InjectRepository)(cuidador_entity_1.Cuidador)),
    __param(2, (0, typeorm_1.InjectRepository)(usuario_entity_1.Usuario)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], PostulacionesService);
//# sourceMappingURL=postulaciones.service.js.map