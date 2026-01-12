# 🚀 Backend de Gestión de Viajes

Este proyecto es un **backend modular, escalable y robusto**, desarrollado con **NestJS**. Sigue los principios de **Domain-Driven Design (DDD)** y **CQRS** (Command Query Responsibility Segregation) para facilitar el mantenimiento, escalabilidad y separación de responsabilidades.

## 🧱 Arquitectura

El proyecto está dividido en las siguientes capas:

- **Domain**: Entidades e interfaces del negocio.
- **Application**: Comandos y handlers según CQRS.
- **Infrastructure**: Persistencia, autenticación, IA, servicios externos (Drive, Email, etc.).
- **Presentation**: Controladores HTTP, DTOs y módulos de cada feature.

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

### 🧩 Módulos principales

- **Usuario, Cliente, Rol, TipoDoc**: Gestión de usuarios y roles.
- **Viaje, Gasto, GastoxViaje, Lugar, Manifiesto**: Gestión de operaciones logísticas.
- **Chat, Mensaje**: Comunicación interna entre usuarios.
- **Autenticación (JWT)** y recuperación de contraseña.
- **Integración con Gemini IA** para clasificación y análisis de datos.
- **Google Drive API** para almacenamiento de archivos.
- **Email Service** para notificaciones.

---
## 🛠️ Tecnologías

- **NestJS**
- **PostgreSQL**
- **JWT**
- **Google Drive API**
- **IA (Gemini API)**
- **Node.js / TypeScript**

---

## 🚀 Instalación

### Requisitos

- Node.js 18+
- PostgreSQL
- Acceso a APIs externas (Google Drive, Gemini IA)

## 🧠 Integraciones Especiales

### 🔊 Chatbot con IA (Gemini)

- Clasificación automática de mensajes
- Generación dinámica de consultas SQL
- Soporte para consultas mixtas (texto + comandos)

### ☁️ Google Drive

- Subida, descarga y organización de archivos
- Integración para gestionar manifiestos y documentos adjuntos

### ✉️ Servicio de Email

- Envío de correos automáticos (viajes, gastos, alertas)

---

## ✅ TODO / Mejoras Futuras

- [ ] Agregar pruebas unitarias a todos los `handlers` y `repositories`
- [ ] Mejorar la paginación y filtros
- [ ] Cacheo de consultas frecuentes
- [ ] Auditoría completa de cambios por usuario
