import jwt from "jsonwebtoken";
//import HttpError from "../util/http-error.js";

const checkAuth = (req, res, next) => {
  try {
    if (req.methode === "OPTIONS") {
      return next();
    }
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new Error("Authenticationfailed!");
    }
    const decodedtoken = jwt.verify(token, "cleSuperSecrete!");
    console.log("---avant---");
    console.log(req.userData);
    req.userData = { userId: decodedtoken.userId };
    console.log("----apres----");
    console.log(req.userData);
    next();
  } catch (err) {
    //const error = new HttpError("Authentication failed!", 401);
    return next("Pas marcher");
  }
};

export default checkAuth;
