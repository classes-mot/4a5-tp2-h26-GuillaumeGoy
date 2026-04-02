const getJeux = (req, res, next) => {
  setTimeout(() => {
    res.json({ jeux: list_jeux });
  }, 3000);
};

export default {
  getJeux,
};
