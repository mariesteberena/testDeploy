# CuidAR - Backend API (NestJS)

Backend API del sistema de gestión para cuidadores, familias y administradores. Desarrollado con NestJS y TypeORM, conectado a SQL Server.

## 🚀 Características

- ✅ API REST con NestJS
- ✅ Autenticación de usuarios
- ✅ Gestión completa de usuarios (CRUD)
- ✅ Gestión de roles
- ✅ Carga de imágenes de perfil
- ✅ Conexión a SQL Server
- ✅ Validación de datos con class-validator

## 📋 Requisitos Previos

- Node.js 18+ y npm
- SQL Server Express (o SQL Server)
- SQL Server Management Studio (SSMS) - opcional pero recomendado

## 🛠️ Instalación

### 1. Clonar el repositorio

```bash
git clone <repository-url>
cd Tpe-CuidAr-Backend
```

### 2. Configurar la Base de Datos

#### Opción A: Usando SQL Server Management Studio (Recomendado)

1. Abre **SQL Server Management Studio**
2. Conecta a tu servidor SQL Server (ej: `DESKTOP-UAR0896\SQLEXPRESS`)
3. Abre el archivo `database/init-sqlserver.sql`
4. Ejecuta el script completo (F5)

#### Opción B: Desde la línea de comandos

```powershell
sqlcmd -S "DESKTOP-UAR0896\SQLEXPRESS" -U sa -P "TuContraseña" -i "database\init-sqlserver.sql"
```

**Nota:** Ajusta el nombre del servidor y la contraseña según tu configuración.

### 3. Instalar dependencias

```bash
npm install
```

### 4. Configurar variables de entorno

Crea el archivo `.env` en la raíz del proyecto con el siguiente contenido:

```env
DB_HOST=DESKTOP-UAR0896\SQLEXPRESS
DB_PORT=1433
DB_DATABASE=cuidar
DB_USERNAME=sa
DB_PASSWORD=TuContraseña
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRES_IN=24h
```

### 5. Iniciar el servidor

```bash
# Modo desarrollo (con watch)
npm run start:dev

# Modo producción
npm run start:prod
```

El backend estará disponible en `http://localhost:3001`

## 📡 API Endpoints

Para una documentación completa y detallada de todos los endpoints, consulta el archivo **[API-DOCUMENTATION.md](./API-DOCUMENTATION.md)**.

### Resumen de Endpoints

**Autenticación (`/api/auth`)**
- `POST /api/auth/login` - Iniciar sesión
- `GET /api/auth/user/:username` - Obtener usuario por username

**Usuarios (`/api/users`)**
- `GET /api/users` - Obtener todos los usuarios
- `GET /api/users/:username` - Obtener un usuario específico
- `POST /api/users` - Crear un nuevo usuario
- `PUT /api/users/:username` - Actualizar un usuario
- `DELETE /api/users/:username` - Eliminar un usuario
- `PATCH /api/users/:username/toggle-status` - Cambiar estado (activo/inactivo)
- `GET /api/users/stats/dashboard` - Estadísticas del dashboard
- `GET /api/users/stats/total` - Total de usuarios
- `GET /api/users/stats/rol/:rolName` - Usuarios por rol
- `GET /api/users/stats/activos` - Usuarios activos

**Roles (`/api/roles`)**
- `GET /api/roles` - Obtener todos los roles

**Cuidadores (`/api/cuidadores`)**
- `GET /api/cuidadores/usuario/:idUsuario` - Obtener perfil de cuidador
- `PUT /api/cuidadores/usuario/:idUsuario` - Crear/actualizar perfil de cuidador

**Postulaciones (`/api/postulaciones`)**
- `GET /api/postulaciones/cuidador/:idCuidador` - Obtener postulaciones de un cuidador
- `POST /api/postulaciones` - Crear nueva postulación
- `DELETE /api/postulaciones/cuidador/:idCuidador/solicitud/:idSolicitud` - Eliminar postulación

**Upload (`/api/upload`)**
- `POST /api/upload/image` - Subir imagen de perfil
- `DELETE /api/upload/image/:filename` - Eliminar imagen

**Health Check**
- `GET /api/health` - Verificar estado del servidor y conexión a BD

## 🗄️ Estructura de la Base de Datos

### Tabla: Roles
- **IdRol**: Identificador único (PK, IDENTITY)
- **NombreRol**: Nombre del rol (único): 'admin', 'worker', 'family'
- **Descripcion**: Descripción del rol
- **Estado**: Estado del rol ('activo' o 'inactivo')
- **FechaCreacion**: Timestamp de creación
- **FechaActualizacion**: Timestamp de última actualización

### Tabla: Usuarios
- **IdUsuario**: Identificador único (PK, IDENTITY)
- **NombreUsuario**: Nombre de usuario (único)
- **Email**: Correo electrónico (único)
- **Nombre**: Nombre del usuario
- **Apellido**: Apellido del usuario
- **Contraseña**: Contraseña hasheada (bcrypt)
- **IdRol**: Referencia al rol (FK a Roles.IdRol)
- **Estado**: Estado del usuario ('activo' o 'inactivo')
- **Imagen**: Ruta de la imagen del usuario (opcional)
- **FechaCreacion**: Timestamp de creación
- **FechaActualizacion**: Timestamp de última actualización

### Relación
- **Usuarios.IdRol** → **Roles.IdRol** (Muchos a Uno)

## 📁 Estructura del Proyecto

```
Tpe-CuidAr-Backend/
├── src/
│   ├── auth/              # Módulo de autenticación
│   │   ├── auth.module.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   └── dto/
│   │       └── login.dto.ts
│   ├── users/             # Módulo de usuarios
│   │   ├── users.module.ts
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   └── dto/
│   │       ├── create-user.dto.ts
│   │       └── update-user.dto.ts
│   ├── roles/             # Módulo de roles
│   │   ├── roles.module.ts
│   │   ├── roles.controller.ts
│   │   └── roles.service.ts
│   ├── upload/            # Módulo de carga de archivos
│   │   ├── upload.module.ts
│   │   └── upload.controller.ts
│   ├── entities/         # Entidades TypeORM
│   │   ├── usuario.entity.ts
│   │   └── rol.entity.ts
│   ├── app.module.ts     # Módulo principal
│   ├── app.controller.ts
│   ├── app.service.ts
│   └── main.ts           # Punto de entrada
├── database/
│   └── init-sqlserver.sql # Script de inicialización de BD
├── images/                # Imágenes subidas
├── package.json
├── tsconfig.json
└── nest-cli.json
```

## 🔐 Credenciales por Defecto

Después de ejecutar el script de base de datos, puedes usar estas credenciales:

- **Admin:** usuario: `admin`, contraseña: `admin123`
- **Cuidador:** usuario: `cuidador1`, contraseña: `cuidador123`
- **Familia:** usuario: `familia1`, contraseña: `familia123`

**⚠️ IMPORTANTE:** Cambia estas contraseñas en producción.

## 🛠️ Tecnologías Utilizadas

- **NestJS** - Framework de Node.js
- **TypeORM** - ORM para TypeScript
- **SQL Server** - Base de datos (mssql)
- **bcryptjs** - Hash de contraseñas
- **Multer** - Carga de archivos
- **class-validator** - Validación de DTOs
- **class-transformer** - Transformación de datos

## 📝 Scripts Disponibles

- `npm run start:dev` - Inicia en modo desarrollo (con watch)
- `npm run start:prod` - Inicia en modo producción
- `npm run build` - Compila TypeScript
- `npm run format` - Formatea el código con Prettier
- `npm run lint` - Ejecuta el linter

## 🐛 Troubleshooting

### Error de conexión a SQL Server
- Verifica que SQL Server esté corriendo
- Verifica las credenciales en `.env`
- Asegúrate de que el puerto 1433 esté abierto
- Verifica que la instancia SQL Server esté habilitada

### Error CORS
- Verifica que `CORS_ORIGIN` en `.env` coincida con la URL del frontend (`http://localhost:5173`)

### Error de compilación TypeScript
- Ejecuta `npm install` nuevamente
- Verifica que todas las dependencias estén instaladas

### El backend no se conecta a la base de datos
- Verifica que SQL Server Browser esté corriendo
- Asegúrate de que el usuario `sa` tenga permisos
- Verifica que la base de datos `cuidar` exista

## 🔒 Seguridad

⚠️ **Notas importantes para producción:**
- Cambiar todas las contraseñas por defecto
- Usar variables de entorno seguras
- Implementar HTTPS
- Configurar CORS apropiadamente
- Revisar y actualizar `JWT_SECRET`
- Las contraseñas se hashean con bcrypt

## 📚 Recursos

- [Documentación NestJS](https://docs.nestjs.com/)
- [Documentación TypeORM](https://typeorm.io/)
- [Documentación SQL Server](https://docs.microsoft.com/en-us/sql/)

## 📄 Licencia

ISC

