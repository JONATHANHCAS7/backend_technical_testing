# Guía de Arquitectura: Domain-Driven Design (DDD)

Este documento define los principios y patrones de DDD que deben guiar el diseño de nuestro software. El objetivo es modelar fielmente la realidad del negocio.

---

## Conceptos Clave de DDD

### 1. Lenguaje Ubicuo
- **Definición:** Es un vocabulario común y compartido entre desarrolladores y expertos del negocio.
- **Regla:** El código (nombres de clases, métodos, variables, módulos) **DEBE** usar los mismos términos que el negocio. Si el negocio dice "OTP", el código usa `Otp`, no `AuthCode` o `VerificationNumber`.

### 2. Bounded Context (Contexto Delimitado)
- **Definición:** Es una frontera lógica que aísla un subdominio específico del negocio, con sus propias reglas y modelo.
- **Regla:** Un Bounded Context debe ser autocontenido. Ejemplo: El contexto de `Autenticación` se encarga solo de credenciales y OTPs, y no debe conocer la lógica de `Transacciones`.

### 3. Bloques de Construcción (Patrones Tácticos)
- **Entidades:** Objetos con una identidad única que perdura en el tiempo (Ej: `Cliente`, `CuentaBancaria`).
- **Value Objects (Objetos de Valor):** Objetos definidos por sus atributos, sin una identidad propia (Ej: `Monto`, `Direccion`). Son inmutables.
- **Agregados:** Un clúster de entidades y objetos de valor que se trata como una unidad de consistencia. Tiene una entidad raíz que es el único punto de acceso (Ej: `CuentaBancaria` es la raíz de sus `Movimientos`).
- **Repositorios:** Se encargan de la persistencia (guardar y recuperar) de los Agregados.

---

## Estructura de Capas Recomendada

1.  **Domain:** El corazón del negocio. Contiene las entidades, objetos de valor y reglas de negocio. No depende de ninguna otra capa.
2.  **Application:** Orquesta los casos de uso. Llama al dominio para ejecutar las reglas de negocio. No contiene lógica de negocio. Define contratos (interfaces) para la infraestructura.
3.  **Infrastructure:** Implementa los detalles técnicos (bases de datos, APIs externas, mensajería). Depende de la capa de aplicación (implementa sus interfaces).
4.  **Interfaces:** Expone la funcionalidad al exterior (Controladores HTTP, Consumidores de eventos, etc.).

---

## Buenas Prácticas y Errores a Evitar

-   ✅ **HACER:** Diseñar dominios ricos, donde las entidades contienen lógica y reglas, no solo datos.
-   ✅ **HACER:** Mantener las capas estrictamente separadas.
-   ❌ **EVITAR:** Dominios anémicos (entidades que son solo estructuras de datos sin comportamiento).
-   ❌ **EVITAR:** Mezclar lógica de infraestructura (ej. entidades del ORM) con el modelo de dominio.