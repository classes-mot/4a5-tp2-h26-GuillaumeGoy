import { validationResult } from "express-validator";
import { Jeux } from "../model/jeux.js";

let id = 2; // temporaire avant d'avoir la DB complete apres
let jid = "j" + id;
let DUMMY_JEUX = [
  {
    id: "j1",
    titre: "Chess",
    description: "Jeux noir et blancs avec des pieces qui se battent.",
    dateCreation: "2019",
  },
];

const getJeux = (req, res, next) => {
  setTimeout(() => {
    res.json({ jeux: DUMMY_JEUX });
  }, 3000);
};

const getJeuxById = (req, res, next) => {
  const jeuxId = req.params.jid;
  console.log(jeuxId);
  const jeux = DUMMY_JEUX.find((u) => u.id === jeuxId);
  if (!jeux) {
    res.status(404).json({ message: "Jeux non trouve." });
  } else {
    res.json({ jeux });
  }
};

const addJeux = async (req, res, next) => {
  const { titre, description, dateCreation } = req.body;

  if (titre.length > 15) {
    return res.status(400).json({
      message: "Le nom du jeux ne peux pas avoir plus que 15 caracteres.",
    });
  }

  console.log("Commence a prendres les data");
  const createdJeux = new Jeux({
    jid,
    titre,
    description,
    dateCreation,
  });
  id++;
  jid = "j" + id;

  try {
    DUMMY_JEUX.push(createdJeux);
    await createdJeux.save();
  } catch (e) {
    const err = new HttpError("Creation de la BD echouee.", 500);
    return next(err);
  }
  res.status(201).json({ jeux: createdJeux });
};

const modJeux = (req, res, next) => {
  const { titre, description } = req.body;
  if (titre.length > 15) {
    return res.status(400).json({
      message:
        "Le nom du jeux ne peux pas avoir plus que 15 caracteres. Meme a la modification :)",
    });
  }
  const taskId = req.params.jid;

  const updatedJeux = { ...DUMMY_JEUX.find((j) => j.id === taskId) };
  const jeuxIndex = DUMMY_JEUX.findIndex((j) => j.id === taskId);
  if (titre) updatedJeux.titre = titre;
  if (description) updatedJeux.description = description;

  DUMMY_JEUX[jeuxIndex] = updatedJeux;

  res.status(200).json({ jeux: updatedJeux });
};

const deleteJeux = (req, res, next) => {
  const jeuxId = req.params.jid;
  DUMMY_JEUX = DUMMY_JEUX.filter((j) => j.id !== jeuxId);
  res.status(200).json({ message: "Deleted jeux." });
};

export default {
  getJeux,
  getJeuxById,
  addJeux,
  modJeux,
  deleteJeux,
};
