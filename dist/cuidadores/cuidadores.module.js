"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CuidadoresModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const cuidadores_controller_1 = require("./cuidadores.controller");
const cuidadores_service_1 = require("./cuidadores.service");
const cuidador_entity_1 = require("../entities/cuidador.entity");
const usuario_entity_1 = require("../entities/usuario.entity");
let CuidadoresModule = class CuidadoresModule {
};
exports.CuidadoresModule = CuidadoresModule;
exports.CuidadoresModule = CuidadoresModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([cuidador_entity_1.Cuidador, usuario_entity_1.Usuario])],
        controllers: [cuidadores_controller_1.CuidadoresController],
        providers: [cuidadores_service_1.CuidadoresService],
        exports: [cuidadores_service_1.CuidadoresService],
    })
], CuidadoresModule);
//# sourceMappingURL=cuidadores.module.js.map