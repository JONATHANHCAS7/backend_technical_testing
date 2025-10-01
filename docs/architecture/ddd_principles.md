# Guía de Arquitectura: Domain-Driven Design (DDD)

Este documento define los principios y patrones de DDD que deben guiar el diseño de nuestro software. El objetivo es modelar fielmente la realidad del negocio y mantener una arquitectura modular, escalable y fácil de mantener.

---

## Conceptos Clave de DDD

### 1. Lenguaje Ubicuo
- **Definición:** Vocabulario común y compartido entre desarrolladores y expertos del negocio.  
- **Regla:** El código **DEBE** usar los mismos términos que el negocio.  
  - Ejemplo: si el negocio dice “OTP”, el código usa `Otp`, no `AuthCode`.

### 2. Bounded Context (Contexto Delimitado)
- **Definición:** Frontera lógica que aísla un subdominio con sus propias reglas y modelo.  
- **Regla:** Cada contexto debe ser autocontenido.  
  - Ejemplo: el contexto de **Autenticación** no conoce la lógica de **Transacciones**.

### 3. Bloques de Construcción (Patrones Tácticos)
- **Entidades:** Objetos con identidad única que perdura en el tiempo (Ej: `Cliente`, `CuentaBancaria`).  
- **Objetos de Valor (Value Objects):** Definidos por sus atributos, sin identidad propia. Son inmutables (Ej: `Monto`, `Direccion`).  
- **Agregados:** Conjunto de entidades/VOs tratados como unidad de consistencia. Tiene una entidad raíz.  
- **Repositorios:** Se encargan de la persistencia de los agregados.

---

## Estructura de Capas Recomendada

La arquitectura se organiza en **cuatro capas principales**. Cada capa tiene una responsabilidad clara y no debe “saltar” hacia otra, siempre se accede en orden descendente:

```
Interfaces   →   Application   →   Domain   →   Infrastructure
```

---

### 1. **Interfaces**
Cómo se expone el sistema al exterior. Aquí viven los **controladores**, endpoints HTTP/gRPC, consumidores de eventos, interceptores y filtros.

```
interfaces/
 ├─ controllers/       # Controladores HTTP, gRPC
 ├─ interceptors/      # Logging, errores, métricas
```

---

### 2. **Application**
Orquesta los **casos de uso**. No contiene reglas de negocio, solo coordina llamadas al dominio.  
Define contratos (interfaces) que implementará la infraestructura.

```
application/
 ├─ use-cases/         # Operaciones del negocio (ej. BuyRecharge.use-case.ts)
 ├─ contracts/         # Interfaces de repositorios, buses de eventos
 ├─ dto/               # Objetos de entrada/salida (class-validator)
 └─ mappers/           # Transformación entre capas (ej. ORM → dominio)
```

---

### 3. **Domain**
El corazón del negocio. Aquí están las reglas y conceptos puros, sin dependencias externas.

```
domain/
 ├─ entities/          # Entidades con identidad (ej. Transaction.entity.ts)
 ├─ value-objects/     # Objetos de valor inmutables (ej. Amount.vo.ts)
 ├─ services/          # Servicios de dominio con lógica (ej. reglas de validación)
 └─ models/            # Interfaces con la estructura de entidades/agregados
```

---

### 4. **Infrastructure**
Implementa detalles técnicos: base de datos, APIs externas, mensajería.  
Depende de Application (implementa sus contratos).

```
infrastructure/
 ├─ persistence/       # Implementaciones de repositorios (TypeORM, Prisma)
 ├─ events/            # Productores/consumidores de eventos (Kafka, Rabbit, in-memory)
 ├─ providers/         # Conexiones a servicios externos (AWS, GCP, APIs)
 └─ config/            # Configuración de integraciones y entornos
```

---

## Buenas Prácticas y Errores a Evitar

- ✅ **HACER:** Diseñar dominios ricos: las entidades deben contener lógica y reglas, no solo datos.  
- ✅ **HACER:** Mantener separadas las capas. Application no contiene lógica de negocio.  
- ❌ **EVITAR:** Dominios anémicos (entidades como simples DTOs).  
- ❌ **EVITAR:** Que la infraestructura “filtre” hacia el dominio (ej. entidades ORM usadas como entidades de dominio).  

---

📌 **Regla de oro:** *El dominio no conoce a nadie. Todos conocen al dominio.*  
