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
exports.CuidadoresController = void 0;
const common_1 = require("@nestjs/common");
const cuidadores_service_1 = require("./cuidadores.service");
let CuidadoresController = class CuidadoresController {
    constructor(cuidadoresService) {
        this.cuidadoresService = cuidadoresService;
    }
    async findByUsuario(idUsuario) {
        const cuidador = await this.cuidadoresService.findByUsuario(idUsuario);
        return {
            success: true,
            cuidador,
        };
    }
    async createOrUpdate(idUsuario, data) {
        const cuidador = await this.cuidadoresService.createOrUpdate(idUsuario, {
            Telefono: data.telefono,
            Ubicacion: data.ubicacion,
            Descripcion: data.descripcion,
            TipoCuidado: data.tipoCuidado,
            TarifaPorHora: data.tarifaPorHora,
            AnosExperiencia: data.anosExperiencia,
            Calificacion: data.calificacion,
            Estado: data.estado || 'activo',
        });
        return {
            success: true,
            cuidador,
        };
    }
};
exports.CuidadoresController = CuidadoresController;
__decorate([
    (0, common_1.Get)('usuario/:idUsuario'),
    __param(0, (0, common_1.Param)('idUsuario', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CuidadoresController.prototype, "findByUsuario", null);
__decorate([
    (0, common_1.Put)('usuario/:idUsuario'),
    __param(0, (0, common_1.Param)('idUsuario', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], CuidadoresController.prototype, "createOrUpdate", null);
exports.CuidadoresController = CuidadoresController = __decorate([
    (0, common_1.Controller)('cuidadores'),
    __metadata("design:paramtypes", [cuidadores_service_1.CuidadoresService])
], CuidadoresController);
//# sourceMappingURL=cuidadores.controller.js.map