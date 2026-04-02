import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) return;
  let uri = "mongodb://localhost:27017/demoMongo";
  try {
    await mongoose.connect(uri);
    isConnected = true;
    console.log("Connexion MongoDB reussie");
  } catch (err) {
    console.error("Erreur de connextion MongoDB :", err.message);
    process.exit(1);
  }
};
