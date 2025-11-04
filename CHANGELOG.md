# Changelog

## v0.3.0 - PostgreSQL + Docker con Prisma

### Añadido
- `docker-compose.yml` con PostgreSQL 16
- Prisma ORM configurado
- Modelo `User` en schema de Prisma
- Cliente Prisma en `src/config/db.ts`
- Migración inicial creada
- Tabla `User` en base de datos

### Comandos útiles

**Levantar base de datos:**
```bash
docker-compose up -d
```

**Ver logs de PostgreSQL:**
```bash
docker-compose logs -f postgres
```

**Parar base de datos:**
```bash
docker-compose down
```

**Crear nueva migración:**
```bash
npx prisma migrate dev --name nombre_migracion
```

**Ver base de datos con Prisma Studio:**
```bash
npx prisma studio
```

**Regenerar cliente Prisma:**
```bash
npx prisma generate
```

### Estructura de base de datos

**Tabla User:**
- `id` (INT, PK, autoincrement)
- `email` (TEXT, unique)
- `name` (TEXT)
- `passwordHash` (TEXT)
- `createdAt` (TIMESTAMP)

---

## v0.2.0 - Express básico

### Añadido
- Servidor Express configurado
- Variables de entorno con validación
- Middlewares: helmet, cors, morgan
- Endpoint `/health`
- Manejo global de errores

---

## v0.1.0 - Proyecto base

### Añadido
- Inicialización de proyecto npm
- Configuración TypeScript
- Estructura de carpetas modular
- Scripts de desarrollo y build
- Configuración de nodemon

