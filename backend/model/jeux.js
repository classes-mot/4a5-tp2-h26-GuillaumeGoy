import mongoose from "mongoose";

const jeuxSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  dateCreation: Date,
});
