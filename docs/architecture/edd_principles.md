# Guía de Arquitectura: Event-Driven Design (EDD)

Este documento define los principios para construir sistemas desacoplados, escalables y reactivos a través de eventos.

---

## Conceptos Clave de EDD

### 1. Evento
- **Definición:** Un registro de un hecho que ocurrió en el negocio. Es inmutable y se nombra en tiempo pasado.
- **Ejemplos:** `PagoProcesado`, `ClienteRegistrado`, `OtpEnviado`.

### 2. Producer (Productor)
- **Definición:** El componente que origina y publica un evento. Su única responsabilidad es notificar que algo sucedió, sin saber quién lo consumirá.

### 3. Consumer (Consumidor)
- **Definición:** El componente que se suscribe a un evento y reacciona a él ejecutando una lógica específica.

### 4. Topic (Tópico / Canal)
- **Definición:** Es el canal de comunicación donde los productores publican eventos y del cual los consumidores leen. En Kafka, los topics son la unidad fundamental de organización de eventos.

### 5. Procesamiento Asíncrono
- **Principio:** La comunicación basada en eventos es inherentemente asíncrona. El productor publica el evento y continúa su flujo sin esperar una respuesta del consumidor. Esto mejora la resiliencia y escalabilidad del sistema.

---

## Principios de Implementación con Kafka

-   **Particiones:** Los topics se dividen en particiones para permitir el procesamiento en paralelo y la escalabilidad horizontal. Un `Consumer Group` distribuirá la carga de lectura de las particiones entre sus miembros.
-   **Persistencia:** Kafka actúa como un `event log` persistente, lo que significa que los eventos se guardan y pueden ser releídos si es necesario.
-   **Idempotencia:** Los consumidores deben ser idempotentes, es decir, deben poder procesar el mismo evento varias veces sin causar efectos secundarios no deseados. Esto es crucial para la tolerancia a fallos.
-   **Contrato de Evento:** Define la estructura (schema) de los datos de un evento. Es vital mantener la compatibilidad hacia atrás en estos contratos para no romper los consumidores existentes.