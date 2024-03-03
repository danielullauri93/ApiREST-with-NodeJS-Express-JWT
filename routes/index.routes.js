import express from "express";
import userRoute from "./user.routes.js";
import entryRoute from "./entry.routes.js"

const router = express.Router();
router.use(userRoute);
router.use(entryRoute);

export default router;