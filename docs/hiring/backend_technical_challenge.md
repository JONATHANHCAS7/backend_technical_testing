# PRUEBA TÉCNICA – BACKEND ENGINEER (NODE.JS)

### **Contexto del Proyecto**

Para ampliar nuestro portafolio, estamos desarrollando un portal transaccional integral que ofrezca recargas a operadores móviles, pagos de servicios, compra de pines de contenido y transferencias bancarias.

Tu desafío inicial será construir el servicio backend que soportará el primer módulo de **recargas móviles**. Este servicio deberá ser seguro, escalable y estar bien estructurado, siguiendo los principios de ingeniería y arquitectura de Puntored.

### **Objetivo**

Construir una API RESTful en **Node.js** utilizando el framework **Nest.js** y **TypeScript**. La API debe permitir autenticar usuarios, realizar recargas móviles y consultar un histórico de transacciones. El diseño debe estar inspirado en los principios de **Domain-Driven Design (DDD)** y aplicar las guías de **Ingeniería Segura** de la compañía.

---

### **Requisitos Funcionales y Reglas de Negocio**

#### Endpoints a construir:

1.  `POST /auth/login`: Para autenticar al usuario y retornar un token JWT.
2.  `POST /recharges/buy`: Para procesar una nueva recarga móvil.
3.  `GET /recharges/history`: Para obtener el historial de recargas del usuario autenticado.

#### Reglas de negocio (a validar en el backend):

* **Valor de recarga:** Mínimo: 1,000 COP, Máximo: 100,000 COP.
* **Número de teléfono:**
    * Debe iniciar en “3”.
    * Debe tener una longitud exacta de 10 caracteres.
    * Debe contener solo valores numéricos.
* **Seguridad:** Todas las rutas, excepto `/auth/login`, deben estar protegidas y requerir un token JWT válido.

---

### **Desafíos por Niveles**

Puedes avanzar hasta donde te sientas cómodo. Cada nivel superado nos permitirá entender mejor tu perfil y tus habilidades.

#### **Nivel 0: Configuración y Autenticación**

* Crear un proyecto en **Nest.js** con TypeScript.
* Implementar el endpoint `POST /auth/login`.
    * Puedes usar un usuario "hardcodeado" o en memoria para la prueba.
    * Debe generar y devolver un **token JWT** si las credenciales son correctas.
* Configurar **variables de entorno** (`.env`) para manejar datos sensibles como el secreto del JWT.

#### **Nivel 1: Lógica de Negocio Principal**

* Crear el DTO (Data Transfer Object) para la petición de recarga, usando `class-validator` para validar los datos de entrada.
* Implementar el endpoint `POST /recharges/buy`.
    * Debe estar protegido por un Guard de autenticación JWT.
    * Debe validar las **reglas de negocio** (monto, formato del número) en la capa de servicio.
    * Debe simular una respuesta exitosa si la recarga es válida.

#### **Nivel 2: Persistencia de Datos e Historial**

* Integrar una base de datos. Se sugiere **SQLite** para facilitar la configuración, o **PostgreSQL** con Docker si lo prefieres.
* Utilizar un ORM (**TypeORM** o **Prisma**) para definir la entidad `Transaction`.
* Modificar el servicio de recargas para que cada transacción exitosa se guarde en la base de datos.
* Implementar el endpoint `GET /recharges/history` que devuelva las transacciones del usuario autenticado.

#### **Nivel 3: Calidad y Pruebas**

* Crear **tests unitarios** (con Jest) para la lógica de negocio en los servicios (ej. validación de montos y números de teléfono).
* Crear **tests de integración (e2e)** para los endpoints, probando casos de éxito (2xx), errores de cliente (4xx) y de servidor (5xx).

#### **Nivel 4: Arquitectura Avanzada (Opcional)**

* Refactorizar la estructura del proyecto para seguir una arquitectura por capas inspirada en **Domain-Driven Design (DDD)**.
    * **Domain**: Entidades y lógica de negocio pura.
    * **Application**: Casos de uso/servicios que orquestan el dominio.
    * **Infrastructure**: Controladores, repositorios, etc.
* **(Bonus) Introducir un concepto de Event-Driven Design (EDD)**. Tras una recarga exitosa, emitir un evento de dominio como `RechargeSucceeded`. Puedes simular un "event bus" en memoria.

---

### **Entregables**

* **Código fuente** en un repositorio (GitHub, GitLab o Bitbucket).
* **README.md** con:
    * Instrucciones de ejecución.
    * Librerías utilizadas.
    * Justificación breve de las decisiones técnicas.
* **(Opcional) URL desplegada** en algún servicio gratuito. Algunas opciones recomendadas son **Render** o **Railway**.

---

### **Rúbrica de evaluación**

| Nivel | Descripción | Qué Evaluamos | Puntos | Peso (%) |
| :--- | :--- | :--- | :--- | :--- |
| **Nivel 0 – Base** | Proyecto base, JWT y variables de entorno. | Conocimiento básico de Nest.js y TypeScript.<br>Implementación de autenticación con JWT.<br>Manejo seguro de secretos. | 15 | 15% |
| **Nivel 1 – Intermedio** | Lógica de negocio y endpoints protegidos. | Implementación de endpoints con Guards.<br>Validación de entradas (DTOs y servicios).<br>Separación de responsabilidades. | 25 | 25% |
| **Nivel 2 – Avanzado**| Persistencia de datos e historial. | Integración de BBDD y uso de ORMs.<br>Diseño de modelos de datos.<br>Lógica para persistir y consultar datos. | 25 | 25% |
| **Nivel 3 – Testing** | Pruebas unitarias y de integración. | Calidad y cobertura de tests unitarios.<br>Pruebas e2e para los endpoints.<br>Cultura de calidad en el desarrollo. | 15 | 15% |
| **Nivel 4 – Arquitectura**| Aplicación de DDD y/o EDD. | Conocimiento de arquitecturas modernas.<br>Capacidad de diseñar soluciones escalables.<br>Profundidad técnica y visión a largo plazo. | 20 | 20% |
| **TOTAL** | | | **100** | **100%** |

---

¡Listo para empezar! Crea tu proyecto, cumple con los niveles deseados y envíanos el enlace a tu repositorio. ¡Éxitos en tu prueba!