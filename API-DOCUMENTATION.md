# 📚 Documentación de API - CuidAR Backend

## Información General

- **Base URL**: `http://localhost:3001/api`
- **Versión**: 1.0.0
- **Formato de Respuesta**: JSON
- **Autenticación**: JWT (opcional, según endpoint)

## Estructura de Respuestas

### Respuesta Exitosa
```json
{
  "success": true,
  "data": { ... }
}
```

### Respuesta de Error
```json
{
  "success": false,
  "message": "Mensaje de error descriptivo",
  "error": "Detalles adicionales del error"
}
```

## Códigos de Estado HTTP

- `200 OK` - Petición exitosa
- `201 Created` - Recurso creado exitosamente
- `400 Bad Request` - Error en la petición (validación, datos inválidos)
- `401 Unauthorized` - No autenticado
- `404 Not Found` - Recurso no encontrado
- `409 Conflict` - Conflicto (ej: usuario ya existe)
- `500 Internal Server Error` - Error del servidor

---

## 🔐 Autenticación (`/api/auth`)

### POST `/api/auth/login`

Inicia sesión y autentica un usuario.

**Request Body:**
```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Respuesta Exitosa (200):**
```json
{
  "success": true,
  "user": {
    "idUsuario": 1,
    "username": "admin",
    "email": "admin@cuidar.com",
    "firstName": "Admin",
    "lastName": "Sistema",
    "role": "admin",
    "status": "activo",
    "image": "/Imagenes/profile.jpg"
  }
}
```

**Errores:**
- `401` - Usuario o contraseña incorrectos
- `400` - Datos de entrada inválidos

---

### GET `/api/auth/user/:username`

Obtiene información de un usuario por su nombre de usuario.

**Parámetros:**
- `username` (string, requerido) - Nombre de usuario

**Respuesta Exitosa (200):**
```json
{
  "success": true,
  "user": {
    "idUsuario": 1,
    "username": "admin",
    "email": "admin@cuidar.com",
    "firstName": "Admin",
    "lastName": "Sistema",
    "role": "admin",
    "status": "activo",
    "image": "/Imagenes/profile.jpg"
  }
}
```

**Errores:**
- `404` - Usuario no encontrado

---

## 👥 Usuarios (`/api/users`)

### GET `/api/users`

Obtiene todos los usuarios del sistema.

**Respuesta Exitosa (200):**
```json
{
  "success": true,
  "users": [
    {
      "idUsuario": 1,
      "username": "admin",
      "email": "admin@cuidar.com",
      "firstName": "Admin",
      "lastName": "Sistema",
      "role": "admin",
      "status": "activo",
      "image": "/Imagenes/profile.jpg",
      "fechaCreacion": "2025-01-01T00:00:00.000Z",
      "fechaActualizacion": "2025-01-01T00:00:00.000Z"
    }
  ]
}
```

---

### GET `/api/users/:username`

Obtiene un usuario específico por su nombre de usuario.

**Parámetros:**
- `username` (string, requerido) - Nombre de usuario

**Respuesta Exitosa (200):**
```json
{
  "success": true,
  "user": {
    "idUsuario": 1,
    "username": "admin",
    "email": "admin@cuidar.com",
    "firstName": "Admin",
    "lastName": "Sistema",
    "role": "admin",
    "status": "activo",
    "image": "/Imagenes/profile.jpg"
  }
}
```

**Errores:**
- `404` - Usuario no encontrado

---

### POST `/api/users`

Crea un nuevo usuario.

**Request Body:**
```json
{
  "username": "nuevoUsuario",
  "email": "usuario@example.com",
  "firstName": "Nombre",
  "lastName": "Apellido",
  "password": "contraseña123",
  "role": "worker",
  "image": "/Imagenes/profile.jpg"
}
```

**Validaciones:**
- `username`: string, requerido
- `email`: string, email válido, requerido
- `firstName`: string, requerido
- `lastName`: string, requerido
- `password`: string, requerido
- `role`: string, requerido
- `image`: string, opcional

**Respuesta Exitosa (201):**
```json
{
  "success": true,
  "user": {
    "idUsuario": 5,
    "username": "nuevoUsuario",
    "email": "usuario@example.com",
    "firstName": "Nombre",
    "lastName": "Apellido",
    "role": "worker",
    "status": "activo",
    "image": "/Imagenes/profile.jpg"
  }
}
```

**Errores:**
- `400` - Datos inválidos o faltantes
- `409` - Usuario o email ya existe

---

### PUT `/api/users/:username`

Actualiza un usuario existente.

**Parámetros:**
- `username` (string, requerido) - Nombre de usuario a actualizar

**Request Body:**
```json
{
  "email": "nuevoemail@example.com",
  "firstName": "NuevoNombre",
  "lastName": "NuevoApellido",
  "role": "admin",
  "image": "/Imagenes/nueva-imagen.jpg"
}
```

**Nota:** Todos los campos son opcionales excepto que se validen según el DTO.

**Respuesta Exitosa (200):**
```json
{
  "success": true,
  "user": {
    "idUsuario": 1,
    "username": "admin",
    "email": "nuevoemail@example.com",
    "firstName": "NuevoNombre",
    "lastName": "NuevoApellido",
    "role": "admin",
    "status": "activo",
    "image": "/Imagenes/nueva-imagen.jpg"
  }
}
```

**Errores:**
- `400` - Datos inválidos
- `404` - Usuario no encontrado
- `409` - Email ya existe (si se intenta cambiar)

---

### DELETE `/api/users/:username`

Elimina un usuario del sistema.

**Parámetros:**
- `username` (string, requerido) - Nombre de usuario a eliminar

**Respuesta Exitosa (200):**
```json
{
  "success": true,
  "message": "Usuario eliminado exitosamente"
}
```

**Errores:**
- `404` - Usuario no encontrado

---

### PATCH `/api/users/:username/toggle-status`

Cambia el estado de un usuario entre activo e inactivo.

**Parámetros:**
- `username` (string, requerido) - Nombre de usuario

**Respuesta Exitosa (200):**
```json
{
  "success": true,
  "user": {
    "idUsuario": 1,
    "username": "admin",
    "status": "inactivo"
  },
  "message": "Estado actualizado exitosamente"
}
```

**Errores:**
- `404` - Usuario no encontrado

---

### GET `/api/users/stats/dashboard`

Obtiene estadísticas del dashboard.

**Respuesta Exitosa (200):**
```json
{
  "success": true,
  "stats": {
    "totalUsers": 50,
    "workers": 20,
    "families": 25,
    "activeUsers": 45
  }
}
```

---

### GET `/api/users/stats/total`

Obtiene el total de usuarios.

**Respuesta Exitosa (200):**
```json
{
  "success": true,
  "count": 50
}
```

---

### GET `/api/users/stats/rol/:rolName`

Obtiene la cantidad de usuarios por rol.

**Parámetros:**
- `rolName` (string, requerido) - Nombre del rol (admin, worker, family)

**Respuesta Exitosa (200):**
```json
{
  "success": true,
  "rol": "worker",
  "count": 20
}
```

---

### GET `/api/users/stats/activos`

Obtiene la cantidad de usuarios activos.

**Respuesta Exitosa (200):**
```json
{
  "success": true,
  "count": 45
}
```

---

## 🎭 Roles (`/api/roles`)

### GET `/api/roles`

Obtiene todos los roles activos del sistema.

**Respuesta Exitosa (200):**
```json
{
  "success": true,
  "roles": [
    {
      "idRol": 1,
      "nombreRol": "admin",
      "descripcion": "Administrador del sistema",
      "estado": "activo"
    },
    {
      "idRol": 2,
      "nombreRol": "worker",
      "descripcion": "Cuidador",
      "estado": "activo"
    },
    {
      "idRol": 3,
      "nombreRol": "family",
      "descripcion": "Familia",
      "estado": "activo"
    }
  ]
}
```

---

## 👨‍⚕️ Cuidadores (`/api/cuidadores`)

### GET `/api/cuidadores/usuario/:idUsuario`

Obtiene el perfil de cuidador asociado a un usuario.

**Parámetros:**
- `idUsuario` (number, requerido) - ID del usuario

**Respuesta Exitosa (200):**
```json
{
  "success": true,
  "cuidador": {
    "idCuidador": 1,
    "idUsuario": 2,
    "telefono": "+5491123456789",
    "ubicacion": "Palermo, CABA",
    "descripcion": "Cuidador con experiencia en adultos mayores",
    "tipoCuidado": "Adulto Mayor",
    "tarifaPorHora": 2500,
    "anosExperiencia": 5,
    "calificacion": 4.5,
    "estado": "activo",
    "fechaCreacion": "2025-01-01T00:00:00.000Z",
    "fechaActualizacion": "2025-01-01T00:00:00.000Z",
    "usuario": {
      "idUsuario": 2,
      "username": "cuidador1",
      "email": "cuidador@example.com",
      "firstName": "María",
      "lastName": "González",
      "role": "worker",
      "status": "activo",
      "image": "/Imagenes/cuidador.jpg"
    }
  }
}
```

**Errores:**
- `404` - Cuidador no encontrado

---

### PUT `/api/cuidadores/usuario/:idUsuario`

Crea o actualiza el perfil de cuidador de un usuario.

**Parámetros:**
- `idUsuario` (number, requerido) - ID del usuario

**Request Body:**
```json
{
  "telefono": "+5491123456789",
  "ubicacion": "Palermo, CABA",
  "descripcion": "Cuidador con experiencia en adultos mayores",
  "tipoCuidado": "Adulto Mayor",
  "tarifaPorHora": 2500,
  "anosExperiencia": 5,
  "calificacion": 4.5,
  "estado": "activo"
}
```

**Nota:** Todos los campos son opcionales. Si el cuidador no existe, se crea; si existe, se actualiza.

**Respuesta Exitosa (200):**
```json
{
  "success": true,
  "cuidador": {
    "idCuidador": 1,
    "idUsuario": 2,
    "telefono": "+5491123456789",
    "ubicacion": "Palermo, CABA",
    "descripcion": "Cuidador con experiencia en adultos mayores",
    "tipoCuidado": "Adulto Mayor",
    "tarifaPorHora": 2500,
    "anosExperiencia": 5,
    "calificacion": 4.5,
    "estado": "activo"
  }
}
```

**Errores:**
- `400` - Datos inválidos
- `404` - Usuario no encontrado

---

## 📋 Postulaciones (`/api/postulaciones`)

### GET `/api/postulaciones/cuidador/:idCuidador`

Obtiene todas las postulaciones de un cuidador.

**Parámetros:**
- `idCuidador` (number, requerido) - ID del cuidador

**Respuesta Exitosa (200):**
```json
{
  "success": true,
  "postulaciones": [
    {
      "idPostulacion": 1,
      "idCuidador": 2,
      "idFamilia": 3,
      "idSolicitud": 1,
      "estado": "pendiente",
      "mensaje": "Tengo experiencia en cuidado de adultos mayores",
      "familia": {
        "idUsuario": 3,
        "nombre": "Familia Rodríguez",
        "email": "familia@example.com"
      },
      "fechaAlta": "2025-01-01T00:00:00.000Z"
    }
  ]
}
```

---

### POST `/api/postulaciones`

Crea una nueva postulación de un cuidador a una solicitud.

**Request Body:**
```json
{
  "idCuidador": 2,
  "idFamilia": 3,
  "idSolicitud": 1,
  "mensaje": "Tengo experiencia en cuidado de adultos mayores"
}
```

**Validaciones:**
- `idCuidador`: number, requerido
- `idFamilia`: number, requerido
- `idSolicitud`: number, requerido
- `mensaje`: string, opcional

**Respuesta Exitosa (200):**
```json
{
  "success": true,
  "postulaciones": [
    {
      "idPostulacion": 1,
      "idCuidador": 2,
      "idFamilia": 3,
      "idSolicitud": 1,
      "estado": "pendiente",
      "mensaje": "Tengo experiencia en cuidado de adultos mayores",
      "familia": {
        "idUsuario": 3,
        "nombre": "Familia Rodríguez",
        "email": "familia@example.com"
      },
      "fechaAlta": "2025-01-01T00:00:00.000Z"
    }
  ]
}
```

**Errores:**
- `400` - Datos faltantes o inválidos
- `404` - Cuidador o familia no encontrados
- `409` - Ya existe una postulación para esta solicitud

---

### DELETE `/api/postulaciones/cuidador/:idCuidador/solicitud/:idSolicitud`

Elimina una postulación específica.

**Parámetros:**
- `idCuidador` (number, requerido) - ID del cuidador
- `idSolicitud` (number, requerido) - ID de la solicitud

**Respuesta Exitosa (200):**
```json
{
  "success": true,
  "postulaciones": [],
  "message": "Postulación eliminada exitosamente"
}
```

**Errores:**
- `404` - Postulación no encontrada

---

## 📤 Upload (`/api/upload`)

### POST `/api/upload/image`

Sube una imagen de perfil.

**Content-Type:** `multipart/form-data`

**Request Body (Form Data):**
- `image` (file, requerido) - Archivo de imagen (jpg, jpeg, png, gif, webp)
- Tamaño máximo: 5MB

**Respuesta Exitosa (200):**
```json
{
  "success": true,
  "message": "Imagen subida exitosamente",
  "path": "/Imagenes/1234567890-123456789.jpg",
  "filename": "1234567890-123456789.jpg"
}
```

**Errores:**
- `400` - No se proporcionó archivo
- `400` - Tipo de archivo no permitido (solo imágenes)
- `400` - Archivo demasiado grande (>5MB)

---

### DELETE `/api/upload/image/:filename`

Elimina una imagen del servidor.

**Parámetros:**
- `filename` (string, requerido) - Nombre del archivo a eliminar

**Respuesta Exitosa (200):**
```json
{
  "success": true,
  "message": "Imagen eliminada exitosamente"
}
```

**Errores:**
- `400` - El archivo no existe
- `400` - Error al eliminar la imagen

---

## 🏥 Health Check (`/api/health`)

### GET `/api/health`

Verifica el estado del servidor y la conexión a la base de datos.

**Respuesta Exitosa (200):**
```json
{
  "status": "ok",
  "database": "connected",
  "timestamp": "2025-01-01T00:00:00.000Z"
}
```

**Errores:**
- `500` - Error de conexión a la base de datos

---

## 📝 Notas Adicionales

### Validación de Datos
- Todos los DTOs utilizan `class-validator` para validación automática
- Los errores de validación retornan código `400` con detalles del error

### Manejo de Errores
- Todos los endpoints manejan errores con códigos HTTP apropiados
- Los mensajes de error son descriptivos y en español

### CORS
- El backend está configurado para aceptar peticiones desde `http://localhost:5173` (frontend)
- Se puede configurar en el archivo `.env` con la variable `CORS_ORIGIN`

### Autenticación
- Actualmente la autenticación es opcional en la mayoría de endpoints
- Se recomienda implementar guards de autenticación JWT para producción

---

## 🔗 Ejemplos de Uso

### Ejemplo: Crear un usuario y subir su imagen

```bash
# 1. Subir imagen
curl -X POST http://localhost:3001/api/upload/image \
  -F "image=@/path/to/image.jpg"

# Respuesta: { "success": true, "path": "/Imagenes/1234567890.jpg", ... }

# 2. Crear usuario con la imagen
curl -X POST http://localhost:3001/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "username": "nuevoUsuario",
    "email": "usuario@example.com",
    "firstName": "Nombre",
    "lastName": "Apellido",
    "password": "contraseña123",
    "role": "worker",
    "image": "/Imagenes/1234567890.jpg"
  }'
```

### Ejemplo: Login y obtener usuario

```bash
# 1. Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "admin123"
  }'

# 2. Obtener información del usuario
curl -X GET http://localhost:3001/api/auth/user/admin
```

---

## 📞 Soporte

Para más información sobre el proyecto, consulta el [README principal](./README.md).

