import express from "express";

import jeuxController from "jeux-controller.js";
const router = express.Router();

//La liste des jeux
router.get("/", jeuxController.getJeux);

router.get("/jeux/:jid", jeuxController.getJeuxById);

router.post("/", jeuxController.addJeux);

router.patch("/jeux/:jid", jeuxController.modJeux);

router.delete("");
