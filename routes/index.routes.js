import express from "express";
import userRoutes from "./user.routes.js";
import productRoutes from "./product.routes.js"

export const router = express.Router();
router.use(userRoutes);
router.use(productRoutes)
