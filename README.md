# API de Recargas Móviles - Prueba Técnica Backend

Esta es una API RESTful desarrollada en **Node.js** con **Nest.js** y **TypeScript** para el módulo de recargas móviles de Puntored. Implementa autenticación JWT, persistencia de datos con SQLite y TypeORM, y sigue principios de Domain-Driven Design (DDD) y Event-Driven Design (EDD).

## Características

- **Autenticación JWT**: Endpoints protegidos con tokens JWT.
- **Validación de Datos**: Uso de class-validator para validaciones robustas.
- **Persistencia**: Base de datos SQLite con TypeORM.
- **Arquitectura DDD**: Separación en capas Domain, Application, Infrastructure e Interfaces.
- **Eventos**: Event bus en memoria para eventos de dominio.
- **Tests**: Cobertura con tests unitarios y e2e usando Jest y Supertest.

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

- **Arquitectura DDD**: Separación clara en capas para mantener el dominio puro y facilitar la escalabilidad.
- **Event-Driven Design**: Uso de event bus para desacoplar componentes y permitir extensiones futuras.
- **SQLite**: Elegido por simplicidad en configuración, como sugerido en el desafío.
- **Validaciones**: Aplicadas tanto en DTOs como en objetos de valor del dominio para defensa en profundidad.
- **Seguridad**: Uso de bcrypt para contraseñas, JWT para autenticación, y validaciones estrictas.
- **Tests**: Cobertura completa con mocks para aislamiento de dependencias.

## Estructura del Proyecto

```
src/
├── domain/                 # Lógica de negocio pura
│   └── recharges/
│       ├── entities/       # Entidades del dominio
│       ├── value-objects/  # Objetos de valor
│       ├── events/         # Eventos de dominio
│       └── repositories/   # Interfaces de repositorios
├── application/            # Casos de uso y servicios de aplicación
│   └── recharges/
│       ├── use-cases/      # Casos de uso
│       └── services/       # Servicios de aplicación
├── infrastructure/         # Detalles técnicos
│   ├── persistence/        # Repositorios y entidades ORM
│   └── events/             # Event bus
└── interfaces/             # Exposición al exterior
    ├── http/
    │   ├── controllers/    # Controladores REST
    │   └── dtos/           # DTOs de entrada/salida
    └── auth/               # Módulo de autenticación
