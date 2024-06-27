import express from "express";
import productRoutes from "../src/routes/products.routes.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = 3000;

app.use(express.json());
app.use("/products", productRoutes);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
