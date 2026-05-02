# Skill de Arquitectura y Generación CRUD

Este repositorio implementa un backend en NestJS con una variante práctica de Clean Architecture y CQRS. Este documento sirve como guía técnica para entender la estructura actual y como base para automatizar la creación de nuevos CRUD, handlers, repositorios, queries SQL, DTOs y módulos.

## Objetivo del proyecto

La aplicación gestiona procesos de logística de viajes con entidades como usuario, cliente, viaje, manifiesto, gastos, lugares, chats, mensajes, roles y tipos de documento. La intención arquitectónica es separar:

- La entrada HTTP y la exposición de endpoints.
- La lógica de aplicación mediante comandos y consultas.
- Los contratos de dominio.
- La persistencia SQL en PostgreSQL.
- Las respuestas estandarizadas para toda la API.

## Arquitectura real implementada

La estructura del proyecto está organizada en cuatro capas funcionales:

### 1. Presentation

Ubicación: `src/presentation`

Contiene los controladores HTTP, DTOs de entrada y módulos de Nest que conectan todo.

Responsabilidades:

- Exponer rutas REST.
- Recibir `Body` y `Query`.
- Construir comandos o consultas CQRS.
- Enviar la ejecución al `CommandBus` o `QueryBus`.
- No contener lógica de negocio ni acceso a base de datos.

### 2. Application

Ubicación: `src/application`

Contiene comandos, handlers y utilidades de aplicación.

Responsabilidades:

- Definir casos de uso concretos.
- Orquestar llamadas al repositorio mediante interfaces de dominio.
- Convertir el resultado en una respuesta uniforme con `ResponseUtil`.
- Capturar errores de infraestructura y transformarlos en respuesta controlada.

### 3. Domain

Ubicación: `src/domain`

Contiene entidades e interfaces de contrato.

Responsabilidades:

- Definir la forma de los objetos del negocio.
- Definir los contratos que debe implementar la infraestructura.
- No depender de Nest, PostgreSQL ni de detalles HTTP.

### 4. Infrastructure

Ubicación: `src/infrastructure`

Contiene la implementación técnica real.

Responsabilidades:

- Implementar repositorios concretos.
- Conectarse a PostgreSQL.
- Cargar queries SQL desde archivos.
- Integrar autenticación, correo, Google Drive, chatbots y JWT.
- Centralizar servicios transversales.

## Flujo de una petición

El flujo estándar de una operación CRUD es el siguiente:

1. Un controlador recibe la petición HTTP.
2. El controlador crea un comando o consulta.
3. El `CommandBus` o `QueryBus` ejecuta el handler correspondiente.
4. El handler llama a una interfaz de dominio, por ejemplo `ClienteInterface`.
5. El repositorio concreto, como `ClienteRepository`, ejecuta la query SQL real.
6. La query se resuelve por nombre a través de `PostgresService`.
7. El handler devuelve una `ResponseDto` usando `ResponseUtil`.

## CQRS aplicado en este backend

El proyecto usa CQRS de forma práctica, no académica:

- Los comandos representan operaciones de escritura como crear, actualizar y eliminar.
- Las consultas representan operaciones de lectura como listar, buscar por id o filtrar.
- Cada caso de uso tiene su propio command/query y su handler.

Patrón observado:

- Command o Query en `src/application/<entidad>/commands`.
- Handler en `src/application/<entidad>/handlers`.
- Controller en `src/presentation/controllers`.
- Registro del handler en `src/presentation/modules/<entidad>.module.ts`.

## Contratos de dominio

Cada entidad tiene un archivo `*.interface.ts` en `src/domain/<entidad>-domain`.

Ese contrato define los métodos que el repositorio debe cumplir. Ejemplo conceptual:

- `getAll()`.
- `getById(id)`.
- `createX(...)`.
- `updateX(...)`.
- `deleteX(id)`.

La aplicación depende de la interfaz, no de la clase concreta. La implementación se inyecta con un token como `'ClienteInterface'`.

## Repositorios

Los repositorios viven en `src/infrastructure/repository`.

Características reales:

- Implementan la interfaz del dominio.
- Inyectan `PostgresService`.
- Obtienen queries por nombre con `getQuery(...)`.
- Ejecutan consultas parametrizadas con `query(...)`.
- No construyen SQL inline salvo casos excepcionales.

Regla importante:

- El nombre del método del repositorio no necesariamente coincide con el nombre de la query SQL, pero debe ser coherente con el caso de uso.

## PostgreSQL y consultas SQL

El motor de persistencia está centralizado en `src/infrastructure/postgres-db/postgres.service.ts`.

Comportamiento relevante:

- Carga todas las consultas `.sql` de `src/infrastructure/postgres-db/queries` de forma recursiva.
- Usa el nombre del archivo sin extensión como clave de lookup.
- Las queries se ejecutan con parámetros para evitar concatenación manual de valores.
- Convierte errores de PostgreSQL en `HttpException` con códigos adecuados.

Errores manejados explícitamente:

- `23503` -> violación de llave foránea, responde `409 Conflict`.
- `23505` -> violación de unique, responde `409 Conflict`.
- `23502` -> valor nulo en campo requerido, responde `400 Bad Request`.
- Cualquier otro error -> `500 Internal Server Error`.

## Convención de queries SQL

Las queries están organizadas por carpeta dentro de `src/infrastructure/postgres-db/queries`.

Ejemplos reales:

- `cliente/get-all-clientes.sql`
- `cliente/get-cliente.sql`
- `cliente/insert-cliente.sql`
- `cliente/update-cliente.sql`
- `cliente/delete-cliente.sql`

Regla de nombrado:

- El nombre del archivo debe ser exactamente el identificador que se usará en `getQuery(...)` sin la extensión `.sql`.
- Si el archivo se llama `insert-cliente.sql`, el repositorio debe pedir `insert-cliente`.

Regla de ubicación:

- Toda query nueva debe quedar dentro de `src/infrastructure/postgres-db/queries/<entidad>/`.
- Si no queda dentro de ese árbol, no será cargada por el servicio.

Regla de build:

- El script `copy:resources` copia estas queries al directorio `dist`.
- No mover las queries fuera de esta convención sin actualizar el loader y el build.

## Respuestas estándar

Las respuestas se normalizan con `ResponseDto` y `ResponseUtil`.

Estructura:

- `status`: código HTTP.
- `msg`: mensaje descriptivo.
- `data`: datos o `null`.

Uso observado:

- `ResponseUtil.success(data, msg, status)`.
- `ResponseUtil.error(msg, status)`.

Regla operativa:

- Los handlers deben devolver siempre esta estructura, no objetos crudos del repositorio.

## Módulos de Nest

Los módulos concretos están en `src/presentation/modules` y ensamblan:

- El controlador.
- El provider del repositorio concreto.
- Los handlers de comandos y consultas.
- `PostgresModule`.
- `CqrsModule`.

Ejemplo de wiring típico:

- `provide: 'ClienteInterface'`
- `useClass: ClienteRepository`

Regla:

- Si se crea una nueva entidad, debe existir su módulo para registrar el controlador, los handlers y la inyección del repositorio.

## DTOs

Los DTOs de entrada viven en `src/presentation/dtos`.

Responsabilidades:

- Validar forma y tipos de los datos que llegan por HTTP.
- Servir como frontera entre la API y la capa de aplicación.

La aplicación usa `ValidationPipe` global en `main.ts` con:

- `whitelist: true`
- `transform: true`

Regla:

- Cualquier DTO nuevo debe ser compatible con validación automática.

## Punto de entrada HTTP

`src/main.ts` configura:

- CORS habilitado.
- Pipes globales de validación.
- Swagger en `/swagger`.
- Respuesta de errores de validación unificada con `ResponseUtil.error(...)`.

## Qué debe tener un CRUD nuevo

Para agregar una nueva entidad, sigue este patrón mínimo:

1. Crear la entidad en `src/domain/<entidad>-domain/<entidad>.entity.ts`.
2. Crear la interfaz de contrato en `src/domain/<entidad>-domain/<entidad>.interface.ts`.
3. Crear los comandos y consultas en `src/application/<entidad>/commands`.
4. Crear los handlers en `src/application/<entidad>/handlers`.
5. Crear el repositorio concreto en `src/infrastructure/repository`.
6. Crear las queries SQL en `src/infrastructure/postgres-db/queries/<entidad>/`.
7. Crear el controlador en `src/presentation/controllers`.
8. Crear o actualizar el módulo en `src/presentation/modules`.
9. Registrar el provider de la interfaz con `useClass`.
10. Registrar el módulo en `AppModule` si aún no está importado.

## Reglas para automatizar la generación de CRUD

Si un agente o script va a generar código nuevo, debe respetar estas reglas:

- No poner SQL inline en handlers o controladores.
- No inyectar repositorios concretos en la aplicación; inyectar interfaces.
- No devolver entidades crudas sin pasar por `ResponseUtil`.
- No saltarse el módulo de presentación.
- No usar nombres distintos entre query file y `getQuery(...)`.
- No colocar queries fuera de `src/infrastructure/postgres-db/queries`.
- No romper la estructura CQRS existente.

## Convención práctica para nuevas entidades

Nombre recomendado por entidad:

- Dominio: `<entidad>-domain`
- Application: `<entidad>`
- Controller: `<entidad>.controller.ts`
- Module: `<entidad>.module.ts`
- Repository: `<entidad>.repository.ts`
- Query folder: `<entidad>/`

Ejemplo con cliente:

- `src/domain/cliente-domain/cliente.entity.ts`
- `src/domain/cliente-domain/cliente.interface.ts`
- `src/application/cliente/commands/create-cliente.command.ts`
- `src/application/cliente/handlers/create-cliente.handler.ts`
- `src/infrastructure/repository/cliente.repository.ts`
- `src/infrastructure/postgres-db/queries/cliente/insert-cliente.sql`
- `src/presentation/controllers/cliente.controller.ts`
- `src/presentation/modules/cliente.module.ts`

## Plantilla mental para un nuevo caso de uso

Cuando se implemente un caso nuevo, la secuencia debe ser:

- Definir nombre del caso de uso.
- Definir comando o query.
- Definir handler.
- Definir método en interfaz.
- Implementar método en repositorio.
- Agregar o reutilizar query SQL.
- Exponer endpoint en controller.
- Registrar handler y provider en el módulo.

## Notas de implementación observadas

- El proyecto ya tiene módulos de soporte para autenticación, correo, Google Drive, IA y JWT.
- El loader de queries es recursivo, por lo que admite subcarpetas dentro de `queries`.
- Las respuestas de los handlers ya están estandarizadas; mantener ese formato evita inconsistencias en el frontend.

## Uso esperado de este archivo

Este documento puede servir como base para un agente de desarrollo o para un asistente interno que genere código. Si se usa como prompt, debe priorizar:

- la arquitectura existente,
- la convención de nombres,
- la separación por capas,
- y la compatibilidad con los handlers y repositorios ya implementados.
