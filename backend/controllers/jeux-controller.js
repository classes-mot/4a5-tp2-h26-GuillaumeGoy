import { validationResult } from "express-validator";
import { Jeux } from "../model/jeux.js";

const DUMMY_JEUX = [
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

  console.log("Commence a prendres les data");
  const createdJeux = new Jeux({
    titre,
    description,
    dateCreation,
  });

  try {
    DUMMY_JEUX.push(createdJeux);
    await createdJeux.save();
  } catch (e) {
    const err = new HttpError("Creation de la BD echouee.", 500);
    return next(err);
  }
  res.status(201).json({ jeux: createdJeux });
};

export default {
  getJeux,
  getJeuxById,
  addJeux,
};
