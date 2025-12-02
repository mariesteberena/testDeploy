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
exports.CuidadoresService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const cuidador_entity_1 = require("../entities/cuidador.entity");
const usuario_entity_1 = require("../entities/usuario.entity");
let CuidadoresService = class CuidadoresService {
    constructor(cuidadorRepository, usuarioRepository) {
        this.cuidadorRepository = cuidadorRepository;
        this.usuarioRepository = usuarioRepository;
    }
    async findByUsuario(idUsuario) {
        const cuidador = await this.cuidadorRepository.findOne({
            where: { IdUsuario: idUsuario },
            relations: ['usuario', 'usuario.rol'],
        });
        if (!cuidador) {
            return null;
        }
        return {
            idCuidador: cuidador.IdCuidador,
            idUsuario: cuidador.IdUsuario,
            telefono: cuidador.Telefono,
            ubicacion: cuidador.Ubicacion,
            descripcion: cuidador.Descripcion,
            tipoCuidado: cuidador.TipoCuidado,
            tarifaPorHora: cuidador.TarifaPorHora,
            anosExperiencia: cuidador.AnosExperiencia,
            calificacion: cuidador.Calificacion,
            estado: cuidador.Estado,
            usuario: {
                idUsuario: cuidador.usuario.IdUsuario,
                username: cuidador.usuario.NombreUsuario,
                email: cuidador.usuario.Email,
                firstName: cuidador.usuario.Nombre,
                lastName: cuidador.usuario.Apellido,
                role: cuidador.usuario.rol.NombreRol,
                status: cuidador.usuario.Estado,
                image: cuidador.usuario.Imagen,
            },
        };
    }
    async createOrUpdate(idUsuario, data) {
        let cuidador = await this.cuidadorRepository.findOne({
            where: { IdUsuario: idUsuario },
        });
        if (!cuidador) {
            cuidador = this.cuidadorRepository.create({
                IdUsuario: idUsuario,
                ...data,
            });
        }
        else {
            Object.assign(cuidador, data);
        }
        const saved = await this.cuidadorRepository.save(cuidador);
        return this.findByUsuario(idUsuario);
    }
    async update(idCuidador, data) {
        const cuidador = await this.cuidadorRepository.findOne({
            where: { IdCuidador: idCuidador },
        });
        if (!cuidador) {
            throw new common_1.NotFoundException('Cuidador no encontrado');
        }
        Object.assign(cuidador, data);
        const saved = await this.cuidadorRepository.save(cuidador);
        return this.findByUsuario(cuidador.IdUsuario);
    }
};
exports.CuidadoresService = CuidadoresService;
exports.CuidadoresService = CuidadoresService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(cuidador_entity_1.Cuidador)),
    __param(1, (0, typeorm_1.InjectRepository)(usuario_entity_1.Usuario)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CuidadoresService);
//# sourceMappingURL=cuidadores.service.js.map