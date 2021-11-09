import express from "express";
import cors from "cors";
import { productsRouter } from "./services/products/index.js";
import { genericErrorHandler, mainErrorHandler } from "./errorHandler.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/test", (req, res) => {
  res.send({ message: "Test success" });
});

app.use("/products", productsRouter);

app.use(mainErrorHandler);
app.use(genericErrorHandler);

export { app };
