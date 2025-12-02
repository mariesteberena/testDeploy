"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = __importStar(require("bcryptjs"));
const usuario_entity_1 = require("../entities/usuario.entity");
const rol_entity_1 = require("../entities/rol.entity");
let AuthService = class AuthService {
    constructor(usuarioRepository, rolRepository) {
        this.usuarioRepository = usuarioRepository;
        this.rolRepository = rolRepository;
    }
    async login(username, password) {
        const usuario = await this.usuarioRepository.findOne({
            where: { NombreUsuario: username },
            relations: ['rol'],
        });
        if (!usuario) {
            throw new common_1.UnauthorizedException('Usuario o contraseña incorrectos');
        }
        if (usuario.Estado !== 'activo') {
            throw new common_1.UnauthorizedException('Usuario inactivo. Contacte al administrador.');
        }
        let isPasswordValid = false;
        if (usuario.Contraseña && (usuario.Contraseña.startsWith('$2a$') || usuario.Contraseña.startsWith('$2b$'))) {
            isPasswordValid = await bcrypt.compare(password, usuario.Contraseña);
        }
        else {
            isPasswordValid = usuario.Contraseña === password;
            if (isPasswordValid) {
                try {
                    const hashedPassword = await bcrypt.hash(password, 10);
                    usuario.Contraseña = hashedPassword;
                    await this.usuarioRepository.save(usuario);
                }
                catch (error) {
                    console.error('Error al hashear contraseña:', error);
                }
            }
        }
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Usuario o contraseña incorrectos');
        }
        return {
            success: true,
            message: 'Login exitoso',
            user: {
                idUsuario: usuario.IdUsuario,
                username: usuario.NombreUsuario,
                email: usuario.Email,
                firstName: usuario.Nombre,
                lastName: usuario.Apellido,
                role: usuario.rol.NombreRol,
                status: usuario.Estado,
                image: usuario.Imagen || null,
            },
        };
    }
    async getUserByUsername(username) {
        const usuario = await this.usuarioRepository.findOne({
            where: { NombreUsuario: username },
            relations: ['rol'],
        });
        if (!usuario) {
            throw new common_1.NotFoundException('Usuario no encontrado');
        }
        return {
            success: true,
            user: {
                idUsuario: usuario.IdUsuario,
                username: usuario.NombreUsuario,
                email: usuario.Email,
                firstName: usuario.Nombre,
                lastName: usuario.Apellido,
                role: usuario.rol.NombreRol,
                status: usuario.Estado,
                image: usuario.Imagen || null,
            },
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(usuario_entity_1.Usuario)),
    __param(1, (0, typeorm_1.InjectRepository)(rol_entity_1.Rol)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], AuthService);
//# sourceMappingURL=auth.service.js.map