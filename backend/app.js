import express from "express";
import cors from "cors";
import userRoutes from "./routes/users-routes.js";
import jeuxRoutes from "./routes/jeux-routes.js";
import errorHandler from "./hander/error-handler.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/jeux", jeuxRoutes);

app.use("api/users", userRoutes);

app.use((req, res, next) => {
  const error = new Error("Route non trouve");
  error.code = 404;
  next(error);
});

app.use(errorHandler);

app.listen(5000, () => {
  console.log("serveur ecoute au", "http://localhost:5000");
});
