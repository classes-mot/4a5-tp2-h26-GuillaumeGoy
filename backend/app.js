import express from "express";
import userRoutes from "./routes/users-routes.js";
import jeuxRoutes from "./routes/jeux-routes.js";

import errorHandler from "./handler/error-handler.js";
import { connectDB } from "./utils/bd.js";

await connectDB;

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-AllowHeaders",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  );
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
  next();
});

app.use("/api/jeux", jeuxRoutes);

app.use("/api/users", userRoutes);

app.use((req, res, next) => {
  const error = new Error("Route non trouve");
  error.code = 404;
  next(error);
});

app.use(errorHandler);

app.listen(5000, () => {
  console.log("serveur ecoute au", "http://localhost:5000");
});
