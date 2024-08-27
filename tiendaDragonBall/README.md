# Notas:
## Descripción de las carpetas y archivos

- **src/**: Carpeta principal que contiene todo el código fuente.
- **config/**: Configuración de la base de datos.
- **modules/**: Cada módulo representa una funcionalidad o dominio específico (productos, usuarios, autenticación).
  - **productos/**: Todo lo relacionado con productos (controladores, modelos, rutas, servicios y repositorios).
  - **usuarios/**: Todo lo relacionado con usuarios (controladores, modelos, rutas, servicios y repositorios).
  - **auth/**: Todo lo relacionado con autenticación y autorización (controladores, rutas, servicios y repositorios).
- **common/**: Componentes comunes que pueden ser utilizados por varios módulos (middlewares, utilidades).
- **public/**: Archivos estáticos como CSS, JavaScript e imágenes.
- **.env**: Variables de entorno.
- **.gitignore**: Archivos y carpetas que Git debe ignorar.
- **app.js**: Archivo principal de la aplicación.
- **package.json**: Dependencias y scripts del proyecto.
- **README.md**: Documentación del proyecto.
