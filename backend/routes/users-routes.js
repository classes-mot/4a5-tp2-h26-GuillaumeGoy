import express from "express";

import usersController from "../controllers/users-controller.js";
const router = express.Router();

router.get("/", usersController.getUsers);

//router.get("/profile/:uid", usersController.getUserById);

//router.post("/register", usersController.registerUser);

//router.post("/login", usersController.login);

export default router;
