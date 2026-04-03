import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

let MOCK_USERS = [
  {
    id: "u1",
    user: "admin",
    password: "admin",
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

export default {
  getUsers,
  getUserById,
  registerUser,
};
