import expres from "express";

const router = expres.Router();

router.get("/products", (req, res) => {
  res.send("Hola Mundo Productos");
});

export default router;
