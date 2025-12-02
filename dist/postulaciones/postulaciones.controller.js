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
exports.PostulacionesController = void 0;
const common_1 = require("@nestjs/common");
const postulaciones_service_1 = require("./postulaciones.service");
let PostulacionesController = class PostulacionesController {
    constructor(postulacionesService) {
        this.postulacionesService = postulacionesService;
    }
    async findByCuidador(idCuidador) {
        const postulaciones = await this.postulacionesService.findByCuidador(idCuidador);
        return {
            success: true,
            postulaciones,
        };
    }
    async create(body, req) {
        const idCuidador = body.idCuidador;
        if (!idCuidador) {
            return {
                success: false,
                message: 'idCuidador es requerido',
            };
        }
        if (!body.idSolicitud) {
            return {
                success: false,
                message: 'idSolicitud es requerido',
            };
        }
        const createPostulacionDto = {
            idFamilia: body.idFamilia,
            idSolicitud: body.idSolicitud,
            mensaje: body.mensaje,
        };
        const postulaciones = await this.postulacionesService.create(idCuidador, createPostulacionDto);
        return {
            success: true,
            postulaciones,
        };
    }
    async remove(idCuidador, idSolicitud) {
        const postulaciones = await this.postulacionesService.remove(idCuidador, idSolicitud);
        return {
            success: true,
            postulaciones,
            message: 'Postulación eliminada exitosamente',
        };
    }
};
exports.PostulacionesController = PostulacionesController;
__decorate([
    (0, common_1.Get)('cuidador/:idCuidador'),
    __param(0, (0, common_1.Param)('idCuidador', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PostulacionesController.prototype, "findByCuidador", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PostulacionesController.prototype, "create", null);
__decorate([
    (0, common_1.Delete)('cuidador/:idCuidador/solicitud/:idSolicitud'),
    __param(0, (0, common_1.Param)('idCuidador', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('idSolicitud', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], PostulacionesController.prototype, "remove", null);
exports.PostulacionesController = PostulacionesController = __decorate([
    (0, common_1.Controller)('postulaciones'),
    __metadata("design:paramtypes", [postulaciones_service_1.PostulacionesService])
], PostulacionesController);
//# sourceMappingURL=postulaciones.controller.js.map