# API REST de Votaciones

Esta API REST, desarrollada en Node.js y Express, permite gestionar un sistema de votaciones. Incluye funcionalidades de autenticación, manejo de usuarios, creación de votos, recuperación de contraseñas, y manejo de archivos.

## Tecnologías y Librerías Usadas

- **Node.js** y **Express**: Framework de servidor.
- **bcrypt**: Para el hashing de contraseñas.
- **dotenv**: Para gestionar variables de entorno.
- **express-fileupload**: Para manejar la carga de archivos.
- **joi**: Para la validación de datos.
- **jsonwebtoken**: Para el manejo de autenticación mediante tokens.
- **mysql2**: Para la conexión y manipulación de la base de datos MySQL.
- **nodemailer**: Para el envío de correos electrónicos.
- **randomstring**: Para generar cadenas aleatorias, por ejemplo, para tokens de recuperación de contraseña.
- **sharp**: Para el procesamiento de imágenes.

## Estructura del Proyecto

- **controllers/**: Contiene los controladores que gestionan la lógica de cada endpoint.
- **db/**: Configuración y conexión a la base de datos.
- **helpers/**: Funciones auxiliares que facilitan diversas operaciones.
- **middlewares/**: Middleware personalizado para autenticación y validación.
- **routes/**: Definición de las rutas de la API.
- **schemas/**: Validaciones y esquemas de datos.
- **services/**: Lógica del negocio y servicios externos.

## Configuración

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```plaintext
HTTP_PORT=3000
UPLOADS_DIR=uploads
DB_HOST=localhost
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=nombre_de_la_base_de_datos
JWT_SECRET=clave_secreta_para_jwt
Scripts en package.json
json
Copiar código
{
  "type": "module",
  "name": "hackathonnode",
  "version": "1.0.0",
  "description": "",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node app.js"
  },
  "author": "Daniel",
  "license": "ISC",
  "dependencies": {
    "bcrypt": "^5.1.1",
    "dotenv": "^16.4.5",
    "express": "^4.18.2",
    "express-fileupload": "^1.4.3",
    "joi": "^17.12.2",
    "jsonwebtoken": "^9.0.2",
    "mysql2": "^3.9.2",
    "nodemailer": "^6.9.10",
    "randomstring": "^1.3.0",
    "sharp": "^0.33.2"
  }
}
Archivos Principales
app.js
Este archivo configura y levanta el servidor de Express, cargando las rutas, middleware, y controladores de errores.

javascript
Copiar código
import dotenv from "dotenv";
import express from "express";
import fileUpload from "express-fileupload";
import router from "./routes/index.routes.js";
import errorController from "./controllers/error/index.controller.js";

dotenv.config();
const { HTTP_PORT } = process.env;
const app = express();

app.use(express.json());
app.use(express.static(process.env.UPLOADS_DIR));
app.use(fileUpload());
app.use(router);
app.use(errorController);

app.listen(HTTP_PORT, () => {
  console.log(`Server running on http://localhost:${HTTP_PORT}`);
});
Funcionalidades Principales
Creación de Votos: Permite a los usuarios votar.
Recuperación de Contraseña: Envío de un correo electrónico para recuperar la contraseña.
Manejo de Archivos: Subida y procesamiento de imágenes con express-fileupload y sharp.
Autenticación: Gestión de sesiones y tokens JWT para autenticar usuarios.
Ejemplo de Uso
Para realizar una petición a la API, asegúrate de enviar los tokens JWT en las rutas que lo requieren, así como los datos necesarios según el endpoint.

bash
Copiar código
curl -X POST http://localhost:3000/api/votos \
-H "Authorization: Bearer <tu_token_jwt>" \
-H "Content-Type: application/json" \
-d '{
  "voto": "positivo"
}'

Instalación
Clona este repositorio.
Ejecuta npm install para instalar las dependencias.
Configura tus variables de entorno en .env.
Inicia el servidor con npm start.
Notas
Esta API utiliza métodos asincrónicos (async) para todas las operaciones de base de datos y de archivos.
Recuerda configurar adecuadamente los permisos de archivo para el directorio de subida (UPLOADS_DIR).
Esta API está en constante desarrollo; asegúrate de revisar los commits y actualizaciones.
Créditos
Creado por Daniel Ullauri. Este proyecto forma parte de un hackathon de Node.js para crear una API REST completa.
