import { validationResult } from "express-validator";
import { Jeux } from "../model/jeux.js";

const DUMMY_JEUX = [
  {
    id: "j1",
    titre: "Chess",
    description: "Jeux noir et blancs avec des pieces qui se battent.",
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

export default {
  getJeux,
  getJeuxById,
};
