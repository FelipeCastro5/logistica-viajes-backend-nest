# 🚀 Backend de Gestión de Logística de Viajes

Este proyecto es un **backend modular, escalable y robusto**, desarrollado con **NestJS**. Sigue los principios de **Domain-Driven Design (DDD)** y **CQRS** (Command Query Responsibility Segregation) para facilitar el mantenimiento, la escalabilidad y la separación de responsabilidades en la gestión integral de la logística de viajes y transporte.

## 🏛 Arquitectura

El proyecto sigue una arquitectura limpia (Clean Architecture) dividida en 4 capas principales:

- **Domain**: Define el núcleo del negocio. Contiene las entidades (Usuario, Viaje, Manifiesto, etc.) y las interfaces de los repositorios sin conocer detalles de infraestructura.
- **Application**: Maneja los casos de uso y la lógica de negocio mediante Comandos (Commands) y Manejadores (Handlers) aplicando el patrón CQRS.
- **Infrastructure**: Implementa los detalles técnicos como la persistencia en base de datos (PostgreSQL), autenticación (JWT), e integración con APIs externas (Google Drive, Email) y proveedores de Inteligencia Artificial (Gemini, OpenAI, OpenRouter, Deepseek, Groq).
- **Presentation**: Expone los Controladores HTTP (Endpoints RESTful) documentados con Swagger, DTOs (Data Transfer Objects) para validación de datos de entrada y la configuración de los Módulos de NestJS.

---

## 📁 Estructura del Proyecto

```text
src:
├── application
│   ├── feature
│   │   ├── commands
│   │   └── handlers
│   └── utilities
│
├── domain
│   └── domain-module
│       ├── entity
│       └── interface
│
├── infrastructure
│   ├── external-services
│   │   ├── ai-providers
│   │   │   ├── provider-1
│   │   │   ├── provider-2  
│   │   │   └── provider-n
│   │   ├── ai-providers
│   │   ├── email-service
│   │   ├── database
│   │   │   └── queries
│   │   ├── repository
│   │   └── jwt
│   └── utilities
│
└── presentation
    ├── controllers
    └── dtos

```

### ⚙️ Funcionalidades por Módulo

El sistema permite gestionar de manera unificada los procesos clave del transporte logístico, organizados en los siguientes módulos:

- **Usuario, Rol y TipoDoc**: Gestión completa del ciclo de vida de los usuarios. Permite autenticación con JWT y asignación de roles jerárquicos (`Administrador`, `Contador`, `Conductor`), así como la tipificación de sus documentos de identidad.
- **Viaje, Remesa y Manifiesto**: Corazón operativo de la plataforma. Permite la creación y seguimiento de viajes, control de puntos de origen y destino, asignación de manifiestos de carga, detalle de remesas (mercancías) y registro de condiciones legales/exoneraciones.
- **Vehículo y Seguro**: Registro y gestión de la flota de vehículos (camiones, remolques) y la trazabilidad de sus respectivas pólizas de seguros obligatorias o contractuales.
- **Gasto y GastoxViaje**: Control minucioso de la estructura de costos operativos (combustible, peaje, alimentación, hospedaje, cargue/descargue, etc.) vinculando el registro del gasto a su respectivo viaje y comprobante de factura.
- **Cliente y Lugar**: Mantenimiento de clientes directos o empresas contratistas y la administración de catálogo de ubicaciones o ciudades disponibles en la operación.
- **Firma**: Gestión de la firma digital de los diferentes documentos generados a lo largo de un viaje para asegurar su validez.
- **Mercancía Peligrosa**: Registro y seguimiento específico de cargas que requieren regulaciones o tratos especiales.
- **Chat, Mensajes y NL2SQL (Chatbot IA)**: Innovador sistema de comunicación interno impulsado por IA, que permite interacciones en lenguaje natural para consultar la base de datos (Text-to-SQL) de manera automática. Soporta integraciones dinámicas con Gemini, OpenAI, Deepseek, etc.
- **Google Drive API**: Almacenamiento persistente, ordenado y escalable de los archivos, fotos o manifiestos en la nube.
- **Email Service**: Motor de notificaciones vía correo electrónico para alertas automáticas.


---

## 💻 Requisitos de Instalación

Para levantar este proyecto en tu entorno local, necesitas tener instalado:

- **Node.js**: v18 o superior.
- **PostgreSQL**: v14 o superior.
- **Git**: Para clonar el repositorio.
- **Credenciales para servicios externos**: APIs de IA (OpenAI, Gemini, etc.), acceso a cuenta SMTP para envíos de correo, y credenciales OAuth2 de Google Cloud (Drive).

---

## 🚀 Paso a Paso: Iniciar el Backend en Local

1. **Clonar el repositorio**:
   Abre una terminal y ejecuta:
   ```bash
   git clone <url-del-repositorio>
   cd logistica-viajes-backend-nest
   ```

2. **Instalar dependencias**:
   Descarga e instala los módulos de Node necesarios con npm:
   ```bash
   npm install
   ```

3. **Configurar las variables de entorno**:
   Copia el archivo base y renómbralo a `.env`:
   ```bash
   cp .env.example .env
   ```
   *Nota: Edita el archivo `.env` según los valores correspondientes explicados en la sección inferior.*

4. **Configurar e inicializar la base de datos**:
   Sigue las instrucciones descritas en la sección **🗄️ Instalación de la Base de Datos** a continuación para crear las tablas necesarias.

5. **Iniciar el servidor local**:
   Una vez configurado todo, levanta el servidor en modo desarrollo con recarga automática:
   ```bash
   npm run start:dev
   ```
   - El servidor se ejecutará de forma predeterminada en el puerto asignado (Ej: `http://localhost:3000`).
   - Podrás acceder a la documentación interactiva de los Endpoints (Swagger) dirigiéndote a: `http://localhost:3000/swagger`.

---

## 🗄️ Instalación de la Base de Datos

El backend asume que ya tienes un motor de PostgreSQL corriendo localmente. Hemos provisto un script SQL completo con la estructura de la base de datos (DDL) y la inserción de registros iniciales (DML) para arrancar rápidamente.

1. Abre tu cliente o gestor de base de datos favorito (pgAdmin, DBeaver, o desde la terminal de `psql`).
2. Crea una nueva base de datos. Recomendamos nombrarla `logistica_viajes_db` (o el nombre que hayas definido en tu archivo `.env`).
   ```sql
   CREATE DATABASE logistica_viajes_db;
   ```
3. Conéctate a la nueva base de datos y ejecuta el script completo que se encuentra en la ruta:
   `src/infrastructure/utilities/db.sql`

   Si utilizas la terminal (`psql`), puedes ejecutar el siguiente comando:
   ```bash
   psql -U postgres -d logistica_viajes_db -f src/infrastructure/utilities/db.sql
   ```
4. Con esto, se generará el modelo relacional del proyecto incluyendo las tablas de `usuario`, `viaje`, `vehiculo`, `manifiesto`, entre otras; y se llenarán las tablas maestras iniciales como los roles y ciudades por defecto.

---

## 🔐 Variables de Entorno

El archivo `.env` contiene información sensible y los conectores clave que hacen funcionar el sistema. Asegúrate de configurar correctamente las siguientes variables:

### 🖥️ Servidor
- **`PORT`**: Puerto local en el que el servidor NestJS escuchará el tráfico (Ejemplo: `3000`).

### 🐘 Base de Datos (BD)
- **`DB_HOST`**: Host o dirección del servidor PostgreSQL (Ej: `localhost` para desarrollo local).
- **`DB_PORT`**: Puerto de PostgreSQL (Generalmente `5432`).
- **`DB_USER`**: Usuario con privilegios de la BD (Ej: `postgres`).
- **`DB_NAME`**: Nombre de la base de datos (Ej: `logistica_viajes_db`).
- **`DB_PASSWORD`**: Contraseña asignada a dicho usuario.
- **`DB_SSL`**: Habilita o deshabilita la capa de conexión SSL. Debe ser `false` en entornos locales, pero usualmente `true` en producción.

### ✉️ Servicio de Email
- **`EMAIL_USER`**: Cuenta de correo (Ej: Gmail) que despachará los mensajes de la plataforma.
- **`EMAIL_PASS`**: Contraseña generada específicamente para aplicaciones desde los ajustes de seguridad del proveedor de correo.

### ☁️ Google Drive
- **`GOOGLE_DRIVE_CLIENT_ID`**: ID de la aplicación generada en la Consola de Google Cloud.
- **`GOOGLE_DRIVE_CLIENT_SECRET`**: Clave o secreto del cliente de dicha aplicación.
- **`GOOGLE_DRIVE_REFRESH_TOKEN`**: Token permanente OAuth2 utilizado para que el backend suba archivos de forma automatizada (offline) sin requerir logueo manual del usuario.
- **`GOOGLE_DRIVE_REDIRECT_URI`**: URI de retorno configurada en Google Console.
- **`GOOGLE_DRIVE_FOLDER_ID`**: ID que identifica la carpeta pública de Drive donde aterrizarán todos los archivos generados o guardados por el backend.

### 🧠 Proveedores de Inteligencia Artificial
Esta arquitectura soporta múltiples modelos LLM para la generación de resúmenes o conversión a sentencias SQL. Solo es estrictamente necesario configurar el de tu preferencia o el que el sistema utilice por defecto:
- **`GEMINI_API_KEY`**: Llave principal para acceder a la API de Google Gemini AI.
- **`OPENROUTER_API_KEY`, `OPENROUTER_MODEL`, `OPENROUTER_BASE_URL`**: Credenciales de la plataforma OpenRouter si deseas un puente hacia otros modelos globales.
- **`OPENAI_API_KEY`, `OPENAI_MODEL`**: Credenciales nativas del ecosistema de OpenAI (Ej: modelo `gpt-4o`).
- **`DEEPSEEK_API_KEY`, `DEEPSEEK_MODEL`, `DEEPSEEK_API_URL`**: Llave de acceso a los modelos económicos de DeepSeek.
- **`GROQ_API`**: Clave de API de los aceleradores de Groq.

### 🔑 Seguridad JWT
- **`JWT_SECRET`**: Cadena alfanumérica altamente secreta y segura utilizada para firmar digitalmente y encriptar los tokens de sesión de los usuarios (`JWT`).

### 🗣️ Configuración Natural Language to SQL (NL2SQL)
Estos parámetros ajustan la precisión de la IA al convertir solicitudes en leguaje natural de texto a comandos `SELECT` en base de datos:
- **`NL2SQL_ALLOWED_SCHEMAS`**: Esquemas de base de datos autorizados para que la IA interactúe (Ej: `public`).
- **`NL2SQL_CACHE_TTL`**: Tiempo (en segundos) en el que se cachean las respuestas estructurales, con el fin de optimizar tiempos de respuesta.
- **`NL2SQL_MAX_TABLES`**: Límite de las tablas analizadas simultáneamente.
- **`NL2SQL_MAX_CHARS`**: Longitud máxima (en caracteres) del esquema SQL que se le inyectará en contexto al modelo de IA.
