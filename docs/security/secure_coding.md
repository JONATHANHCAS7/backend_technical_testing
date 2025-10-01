# Guía de Ingeniería y Codificación Segura de Puntored

Este documento consolida los principios de seguridad y las prácticas de codificación que deben seguirse en todos los desarrollos.

---

## Parte I: Principios de Ingeniería Segura

### 1. Seguridad por Diseño
- **Descripción:** La seguridad debe integrarse desde la concepción del producto.
- **Acciones:**
    - Realizar análisis de amenazas y modelado de riesgos (OWASP).
    - Definir y usar los requisitos de cifrado establecidos:
        - **Contraseñas:** `bcrypt` (NestJS/Spring Security).
        - **Datos Sensibles:** AES-256.
    - Utilizar los estándares de autenticación definidos: OAuth2 / JWT.

### 2. Seguridad por Defecto
- **Descripción:** Los servicios deben estar preconfigurados para operar en modo seguro por defecto.
- **Acciones:**
    - Desactivar CORS y habilitarlo solo para orígenes confiables.
    - Deshabilitar endpoints de debug (ej. `/actuator`) en entornos productivos.
    - Configurar `Helmet` en el frontend para añadir cabeceras de seguridad.
    - **PROHIBIDO** exponer claves o secretos en el código del frontend.

### 3. Defensa en Profundidad
- **Descripción:** Cada componente (API, frontend, app móvil) debe tener sus propias capas de seguridad independientes.
- **Acciones:**
    - **Validación de Datos:** Usar `class-validator` (NestJS) o `Hibernate Validator` (Spring) en el backend.
    - **Cifrado en Tránsito:** Todo el tráfico debe usar HTTPS con TLS 1.2+.
    - **MFA:** Implementar autenticación de múltiples factores en accesos críticos.

### 4. Fallar de Forma Segura
- **Descripción:** Las fallas del sistema no deben comprometer la seguridad ni revelar información sensible.
- **Acciones:**
    - Implementar manejadores de errores globales (`HttpExceptionFilter` en NestJS, `ControllerAdvice` en Spring).
    - **PROHIBIDO** exponer `stack traces` o detalles de la infraestructura en los mensajes de error al cliente.

### 5. Mínimo Privilegio
- **Descripción:** Los usuarios y servicios deben operar con los permisos estrictamente necesarios para su función.
- **Acciones:**
    - Utilizar roles específicos en la base de datos (no usar `root`).
    - Implementar autorización basada en roles (`Guards` en NestJS, `@PreAuthorize` en Spring).

---

## Parte II: Principios de Codificación Segura

### 1. Validación de Entradas
- **Regla:** Toda entrada de usuarios o sistemas externos debe ser validada rigurosamente en el **servidor**. La validación en frontend es solo un apoyo.
- **Cómo:** Definir tipos, formatos, longitudes y rangos esperados para cada dato de entrada.

### 2. Codificación de Salidas
- **Regla:** Toda salida enviada fuera de la aplicación debe ser codificada para prevenir ataques XSS.
- **Cómo:** Sanitizar HTML renderizado (`DOMPurify`) y configurar cabeceras CSP (`Helmet`).

### 3. Autenticación y Manejo de Secretos
- **Regla:** Hashear contraseñas con algoritmos fuertes (`bcrypt`, `Argon2`).
- **Regla:** Los secretos (claves de API, contraseñas de BD) **NUNCA** deben estar en el código. Usar variables de entorno o un gestor de secretos (Vault).

### 4. Autorización por Solicitud
- **Regla:** Verificar los permisos del usuario en el **backend** en cada solicitud a un recurso protegido. La UI solo oculta elementos, no protege el recurso.

### 5. Manejo de Errores y Logs
- **Regla:** Registrar accesos, errores (4xx/5xx) y eventos de seguridad.
- **Regla:** Los logs no deben contener información sensible.

### 6. Seguridad de Bases de Datos
- **Regla:** Utilizar siempre consultas parametrizadas (`PreparedStatement`, repositorios de ORM) para prevenir Inyección SQL. **NUNCA** concatenar strings para construir queries.

### 7. Manejo de Archivos
- **Regla:** Validar el tipo de archivo real (MIME type) y el tamaño en el servidor.
- **Regla:** Guardar los archivos subidos fuera del directorio raíz público del servidor web.