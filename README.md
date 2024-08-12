# Proyecto de Gestión de Tareas

Este proyecto es una aplicación de gestión de tareas con un frontend basado en Stencil.js y un backend en Node.js con MySQL. Permite crear, leer, actualizar y eliminar tareas en una base de datos.

## Contenido

- [Link](#link)
- [Descripción](#descripción)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Uso](#uso)
- [Estructura del Proyecto](#estructura-del-proyecto)


### Link

Este es el link del repositorio en github:

- https://github.com/Wilz22/crud-tareas

## Descripción

La aplicación permite a los usuarios gestionar tareas, con funcionalidades para:

- Crear nuevas tareas.
- Ver una lista de tareas.
- Editar tareas existentes.
- Eliminar tareas.

### Frontend

- **Tecnología**: Stencil.js
- **Componentes**: `to-do-cards`, `to-do-card-list`

### Backend

- **Tecnología**: Node.js, MySQL
- **Rutas**: CRUD para tareas

### Instalación

## Frontend

1. **Navega al directorio del frontend**:

   ```bash
   cd frontend

2. **Instala las dependencias**:
    ```bash
    npm install
    npm start

## Backend
1. Navega al directorio del backend:
    ```bash
    cd backend

2. Ejecutar el backend:
    ```bash
    node index.js

### Requisitos

- Node.js (versión 14 o superior)
- MySQL (versión 5.7 o superior)



### Configuración

Configuración de Base de Datos
- Edita el archivo backend/config/database.js con tus credenciales de MySQL

e importa el archivo sql de la base de datos tareas_hogar.sql


### Uso

- Crear Tarea: Usa el formulario en el frontend para agregar una nueva tarea.
- Ver Tareas: Se mostrarán todas las tareas existentes en la interfaz.
- Editar Tarea: Haz doble clic en el título de la tarea para editarla.
- Eliminar Tarea: Usa el botón de eliminar en cada tarea.

### Estructura del Proyecto

- frontend/: Código fuente del frontend en Stencil.js.
- backend/: Código fuente del backend en Node.js.
- config/: Configuración de la base de datos para el backend.
- models/: Modelos de datos para el backend.
- services/: Servicios para interactuar con la base de datos.
