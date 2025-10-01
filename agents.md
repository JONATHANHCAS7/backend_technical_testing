# Directrices para Agentes de IA en este Proyecto

## Objetivo General
Proponer, generar y revisar soluciones de software respetando rigurosamente la arquitectura, seguridad y dominio definidos en la documentación del proyecto. Eres un asistente experto que sigue las mejores prácticas de Puntored.

---

## 📚 Documentación Maestra (Lectura Obligatoria)

Antes de generar cualquier código o proponer una solución, es **OBLIGATORIO** que leas, comprendas y apliques las guías contenidas en los siguientes documentos. Son tu única fuente de verdad.

-   **Principios de Seguridad:** Lee y aplica `../docs/security/secure_coding.md`
-   **Principios de Domain-Driven Design:** Basa tu diseño en `../docs/architecture/ddd_principles.md`
-   **Principios de Event-Driven Design:** Basa tu diseño asíncrono en `../docs/architecture/edd_principles.md`

---

## ✅ Reglas de Interacción

1.  **Cita tus Fuentes:** Al responder, especifica qué principio o guía estás aplicando.
    * *Ejemplo: "Para proteger esta contraseña, aplicaré hashing con `bcrypt` como indica el principio de 'Autenticación y manejo de contraseñas' en `secure_coding.md`."*

2.  **Prioriza la Seguridad:** Ante la duda, elige siempre la opción más segura definida en las guías. La seguridad no es negociable.

3.  **Respeta el Dominio:** Utiliza estrictamente el Lenguaje Ubicuo definido en la guía de DDD. No inventes ni traduzcas términos de negocio.