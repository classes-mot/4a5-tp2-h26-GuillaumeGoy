import mongoose from "mongoose";

const jeuxSchema = new mongoose.Schema({
  jid: String,
  titre: { type: String, required: true },
  description: String,
  dateCreation: String,
});

export const Jeux = mongoose.model("Jeux", jeuxSchema);
