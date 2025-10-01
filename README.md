# API de Recargas Móviles - Prueba Técnica Backend

Esta es una API RESTful desarrollada en **Node.js** con **Nest.js** y **TypeScript** para el módulo de recargas móviles de Puntored. Implementa autenticación JWT, persistencia de datos con SQLite y TypeORM, y sigue estrictamente los principios de Domain-Driven Design (DDD) y Event-Driven Design (EDD) documentados en [`docs/architecture/`](docs/architecture/).

## Características

- **Autenticación JWT**: Endpoints protegidos con tokens JWT.
- **Validación de Datos**: Uso de class-validator para validaciones robustas.
- **Persistencia**: Base de datos SQLite con TypeORM.
- **Arquitectura DDD**: Separación en capas Domain, Application, Infrastructure e Interfaces.
- **Eventos**: Event bus en memoria para eventos de dominio.
- **Tests**: Cobertura con tests unitarios y e2e usando Jest y Supertest.
## Arquitectura

La aplicación sigue una arquitectura basada en **Domain-Driven Design (DDD)** y **Event-Driven Design (EDD)**, organizada en cuatro capas principales que promueven la separación de responsabilidades, escalabilidad y mantenibilidad.

```mermaid
graph TD
    A[Interfaces<br/>- Controllers<br/>- DTOs] --> B[Application<br/>- Use Cases<br/>- DTOs]
    B --> C[Domain<br/>- Entities<br/>- Value Objects<br/>- Events<br/>- Repositories]
    C --> D[Infrastructure<br/>- Persistence (TypeORM)<br/>- Event Bus<br/>- Config]
    
    E[Auth Module] --> A
    F[Recharges Module] --> A
```

- **Interfaces**: Exposición al exterior (controladores HTTP, DTOs).
- **Application**: Orquestación de casos de uso y coordinación.
- **Domain**: Lógica de negocio pura (entidades, value objects, eventos).
- **Infrastructure**: Detalles técnicos (persistencia, event bus).

Para más detalles, consulta los documentos en [`docs/architecture/`](docs/architecture/).

## Instalación y Ejecución

### Prerrequisitos
- Node.js (versión 18 o superior)
- npm

### Instalación
```bash
npm install
```

### Configuración
Crear archivo `.env` en la raíz del proyecto:
```
JWT_SECRET=tu_clave_secreta_aqui
```

### Ejecución
```bash
# Desarrollo con watch mode
npm run start:dev

# Producción
npm run start:prod
```

La API estará disponible en `http://localhost:3000`.

## Endpoints

### Autenticación
- `POST /auth/login`: Autenticar usuario y obtener token JWT.
  - Body: `{ "username": "testuser", "password": "password123" }`

### Recargas
- `POST /recharges/buy`: Procesar recarga móvil (requiere JWT).
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ "amount": 5000, "phoneNumber": "3123456789" }`

- `GET /recharges/history`: Obtener historial de recargas (requiere JWT).
  - Headers: `Authorization: Bearer <token>`

## Tests

```bash
# Tests unitarios
npm run test

# Tests e2e
npm run test:e2e

# Cobertura de tests
npm run test:cov
```

## Librerías Utilizadas

- **@nestjs/common, @nestjs/core, @nestjs/platform-express**: Framework Nest.js.
- **@nestjs/jwt, @nestjs/passport**: Autenticación JWT.
- **@nestjs/typeorm, typeorm, sqlite3**: ORM y base de datos.
- **class-validator, class-transformer**: Validación de datos.
- **bcrypt**: Hashing de contraseñas.
- **jest, supertest**: Testing.

## Decisiones Técnicas

- **Arquitectura DDD**: Separación clara en capas (Interfaces → Application → Domain → Infrastructure) para mantener el dominio puro y facilitar la escalabilidad.
- **Event-Driven Design**: Uso de event bus en memoria para publicar eventos de dominio (ej. RechargeSucceeded), desacoplando componentes y permitiendo extensiones futuras.
- **Value Objects**: Implementación de objetos de valor inmutables (Amount, PhoneNumber) para encapsular validaciones y lógica de negocio.
- **Orquestración de Casos de Uso**: Use cases coordinan operaciones complejas, como la orquestración de recargas que involucra múltiples pasos y eventos.
- **SQLite**: Elegido por simplicidad en configuración, como sugerido en el desafío.
- **Validaciones**: Aplicadas tanto en DTOs como en objetos de valor del dominio para defensa en profundidad.
- **Seguridad**: Uso de bcrypt para contraseñas, JWT para autenticación, y validaciones estrictas.
- **Tests**: Cobertura completa con mocks para aislamiento de dependencias.

## Estructura del Proyecto

```
src/
├── app.controller.ts
├── app.controller.spec.ts
├── app.module.ts
├── app.service.ts
├── main.ts
├── auth/                   # Módulo de autenticación
│   ├── auth.controller.ts
│   ├── auth.module.ts
│   ├── auth.service.ts
│   ├── dto/
│   ├── jwt-auth.guard.ts
│   └── jwt.strategy.ts
└── recharges/              # Módulo de recargas
    ├── application/        # Casos de uso y DTOs
    │   ├── dto/
    │   └── use-cases/
    ├── domain/             # Lógica de negocio pura
    │   ├── entities/
    │   ├── value-objects/
    │   ├── events/
    │   └── repositories/
    ├── infrastructure/     # Detalles técnicos
    │   ├── events/
    │   ├── persistence/
    │   └── recharges.module.ts
    └── interfaces/         # Exposición al exterior
        └── controllers/
```
