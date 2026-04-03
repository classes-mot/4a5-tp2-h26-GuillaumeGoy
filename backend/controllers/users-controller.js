import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";

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

export default {
  getUsers,
  getUserById,
};
