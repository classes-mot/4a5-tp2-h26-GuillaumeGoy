import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

let MOCK_USERS = [
  {
    id: "u1",
    user: "admin",
    password: "admin",
    dateCreation: Date.now(),
  },
];

const getUsers = (req, res, next) => {
  setTimeout(() => {
    res.json({ users: MOCK_USERS });
  }, 3000);
};

const getUserById = (req, res, next) => {
  const userId = req.params.uid;
  const user = MOCK_USERS.find((u) => u.id === userId);
  if (!user) {
    res.status(404).json({ message: "Utilisateur non trouve." });
  } else {
    res.json({ user });
  }
};

const registerUser = (req, res, next) => {
  console.log("Registering");
  const { user, password } = req.body;

  if (user.length > 12) {
    return res.status(400).json({
      message: "Le username ne peut pas avoir plus que 12 caracteres.",
    });
  }
  const sansSpecialRegex = /^[a-zA-Z0-9]+$/;
  if (!sansSpecialRegex.test(user)) {
    return res
      .status(400)
      .json({
        message: "Le username peut pas contenir des caracteres speciaux.",
      });
  }
  const hasUser = MOCK_USERS.find((u) => u.user === user);
  if (hasUser) {
    res.status(422).json({ message: "Cet user est deja utilise." });
    return;
  }
  const createdUser = {
    id: uuidv4(),
    user,
    password,
  };
  MOCK_USERS.push(createdUser);
  console.log("registered");
  res.status(201).json({ user: createdUser });
};

const login = (req, res, next) => {
  const { user, password } = req.body;
  console.log(user, password);

  const identifiedUser = MOCK_USERS.find(
    (u) => u.user === user && u.password === password,
  );
  console.log(identifiedUser);
  if (!identifiedUser) {
    res
      .status(401)
      .json({ message: "Identification echoue, verifiez vos identifiants" });
  } else {
    let token;
    try {
      console.log("identifie!");
      token = jwt.sign({ userId: identifiedUser.id }, "cleSuperSecrete!", {
        expiresIn: "1h",
      });
      console.log(token);
    } catch (err) {
      console.error(err);
      const error = new HttpError(
        "Signing up failed, please try again later.",
        500,
      );
      return next(error);
    }
    res.status(201).json({
      userId: identifiedUser.id,
      token: token,
    });
  }
};

export default {
  getUsers,
  getUserById,
  registerUser,
  login,
};
