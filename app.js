import express from "express";
import fileUpload from "express-fileupload";
import dotenv from "dotenv";
import { router } from "./routes/index.routes.js";
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

/** importamos la libreria "fileUpload" para que el manejo de archivos como fotos sea posible */

/* Nota: todo lo que manipule archivo o base de datos va hacer asincronico, por eso siempre va "async" */