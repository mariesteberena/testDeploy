# CuidAR - Backend API (NestJS)

Backend API del sistema de gestión para cuidadores, familias y administradores. Desarrollado con NestJS y TypeORM, conectado a MySQL.

## 🚀 Características

- ✅ API REST con NestJS
- ✅ Autenticación de usuarios
- ✅ Gestión completa de usuarios (CRUD)
- ✅ Gestión de roles
- ✅ Carga de imágenes de perfil
- ✅ Conexión a MySQL
- ✅ Validación de datos con class-validator

## 📋 Requisitos Previos

- *Node.js 18+* y *npm* (o *yarn*)
- *SQL Server* instalado y corriendo (SQL Server Express, SQL Server Developer, o SQL Server)
- *SQL Server Management Studio (SSMS)* - opcional pero recomendado

## 🛠️ Instalación y Configuración Local

### 1. Navegar a la carpeta del Backend

bash
cd "Cuidar Final React/Tpe-CuidAr-Backend"


### 2. Instalar dependencias

bash
npm install


### 3. Configurar la Base de Datos SQL Server

#### Paso 1: Crear la base de datos

Abre *SQL Server Management Studio (SSMS)* y ejecuta:

sql
CREATE DATABASE cuidar;
GO
USE cuidar;
GO


#### Paso 2: Ejecutar el script SQL

El script database/Script.sql está escrito en sintaxis de *SQL Server* y creará todas las tablas necesarias (Roles, Usuarios, Cuidadores, Postulaciones) e insertará datos iniciales.

*Desde SQL Server Management Studio (Recomendado):*
1. Conecta a tu servidor SQL Server (ej: DESKTOP-NOMBRE\SQLEXPRESS o localhost\SQLEXPRESS)
2. Abre el archivo database/Script.sql
3. Ejecuta todo el script (F5 o botón Execute)

### 4. Configurar variables de entorno

Crea un archivo .env en la raíz del proyecto (Tpe-CuidAr-Backend) con el siguiente contenido:

env
# Configuración de SQL Server
# Nota: El código actual está configurado para MySQL pero el script SQL es para SQL Server
# Necesitarás ajustar app.module.ts para usar SQL Server si usas este script

# Para MySQL (configuración actual del código)
MYSQL_ADDON_HOST=localhost
MYSQL_ADDON_PORT=3306
MYSQL_ADDON_USER=root
MYSQL_ADDON_PASSWORD=tu_contraseña_mysql
MYSQL_ADDON_DB=cuidar

# Configuración del servidor
PORT=3001
NODE_ENV=development

# CORS
CORS_ORIGIN=http://localhost:5173

### 5. Iniciar el servidor

bash
# Modo desarrollo (con watch - se recarga automáticamente)
npm run start:dev

# Modo producción
npm run start:prod


El backend estará disponible en `http://localhost:3001`

## 📡 API Endpoints

Para una documentación completa y detallada de todos los endpoints, consulta el archivo **[API-DOCUMENTATION.md](./API-DOCUMENTATION.md)**.

### Resumen de Endpoints Principales

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

**Roles (`/api/roles`)**
- `GET /api/roles` - Obtener todos los roles

**Cuidadores (`/api/cuidadores`)**
- `GET /api/cuidadores/usuario/:idUsuario` - Obtener perfil de cuidador
- `PUT /api/cuidadores/usuario/:idUsuario` - Crear/actualizar perfil de cuidador

**Postulaciones (`/api/postulaciones`)**
- `GET /api/postulaciones/cuidador/:idCuidador` - Obtener postulaciones
- `POST /api/postulaciones` - Crear nueva postulación

**Upload (`/api/upload`)**
- `POST /api/upload/image` - Subir imagen de perfil
- `DELETE /api/upload/image/:filename` - Eliminar imagen

**Health Check**
- `GET /api/health` - Verificar estado del servidor y conexión a BD

## 🔐 Credenciales por Defecto

Después de ejecutar el script de base de datos, puedes usar estas credenciales:

- **Admin:** usuario: `admin`, contraseña: `admin123`
- **Cuidador:** usuario: `cuidador1`, contraseña: `cuidador123`
- **Familia:** usuario: `familia1`, contraseña: `familia123`

## 📁 Estructura del Proyecto


Tpe-CuidAr-Backend/
├── src/
│   ├── auth/              # Módulo de autenticación
│   ├── users/             # Módulo de usuarios
│   ├── roles/             # Módulo de roles
│   ├── upload/            # Módulo de carga de archivos
│   ├── cuidadores/        # Módulo de cuidadores
│   ├── postulaciones/     # Módulo de postulaciones
│   ├── entities/          # Entidades TypeORM
│   ├── app.module.ts      # Módulo principal
│   └── main.ts            # Punto de entrada
├── database/
│   └── Script.sql         # Script de inicialización de BD
├── images/                # Imágenes subidas (se crea automáticamente)
├── package.json
├── tsconfig.json
└── nest-cli.json
```

## 📝 Scripts Disponibles

- npm run start:dev - Inicia en modo desarrollo (con watch)
- npm run start:prod - Inicia en modo producción
- npm run build - Compila TypeScript
- npm run format - Formatea el código con Prettier
- npm run lint - Ejecuta el linter

## 🛠️ Tecnologías Utilizadas

- *NestJS* - Framework de Node.js
- *TypeORM* - ORM para TypeScript
- *SQL Server* - Base de datos (el script SQL está en formato SQL Server)
- *MySQL* - Base de datos (configuración actual en código - requiere ajuste)
- *bcryptjs* - Hash de contraseñas
- *Multer* - Carga de archivos
- *class-validator* - Validación de DTOs
- *class-transformer* - Transformación de datos

*⚠️ NOTA:* Hay una inconsistencia entre el script SQL (SQL Server) y la configuración del código (MySQL). Debes alinear ambos.

## 📚 Recursos

- [Documentación NestJS](https://docs.nestjs.com/)
- [Documentación TypeORM](https://typeorm.io/)
- [Documentación SQL Server](https://docs.microsoft.com/en-us/sql/)
- [Documentación MySQL](https://dev.mysql.com/doc/)