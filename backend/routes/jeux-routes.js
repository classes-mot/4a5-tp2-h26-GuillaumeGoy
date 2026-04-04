import express from "express";
import checkAuth from "../middleware/jwt-verif.js";

import jeuxController from "../controllers/jeux-controller.js";
const router = express.Router();

//La liste des jeux
router.get("/", jeuxController.getJeux);

router.get("/:jid", jeuxController.getJeuxById);

router.use(checkAuth);

router.post("/", jeuxController.addJeux);

router.patch("/:jid", jeuxController.modJeux);

//router.delete("");

export default router;
