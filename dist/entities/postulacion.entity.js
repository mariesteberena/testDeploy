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
exports.Postulacion = void 0;
const typeorm_1 = require("typeorm");
const cuidador_entity_1 = require("./cuidador.entity");
const usuario_entity_1 = require("./usuario.entity");
let Postulacion = class Postulacion {
};
exports.Postulacion = Postulacion;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Postulacion.prototype, "IdPostulacion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Postulacion.prototype, "IdCuidador", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Postulacion.prototype, "IdFamilia", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Postulacion.prototype, "IdSolicitud", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, default: 'pendiente' }),
    __metadata("design:type", String)
], Postulacion.prototype, "Estado", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 500, nullable: true }),
    __metadata("design:type", String)
], Postulacion.prototype, "Mensaje", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Postulacion.prototype, "FechaAlta", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => cuidador_entity_1.Cuidador, (cuidador) => cuidador.postulaciones),
    (0, typeorm_1.JoinColumn)({ name: 'IdCuidador' }),
    __metadata("design:type", cuidador_entity_1.Cuidador)
], Postulacion.prototype, "cuidador", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => usuario_entity_1.Usuario),
    (0, typeorm_1.JoinColumn)({ name: 'IdFamilia' }),
    __metadata("design:type", usuario_entity_1.Usuario)
], Postulacion.prototype, "familia", void 0);
exports.Postulacion = Postulacion = __decorate([
    (0, typeorm_1.Entity)('Postulaciones')
], Postulacion);
//# sourceMappingURL=postulacion.entity.js.map