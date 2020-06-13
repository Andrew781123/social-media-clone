const authorizeUser = (req, res, next) => {
  if (!req.user)
    return res.status(401).json({ message: "You are not authorized" });
  next();
};

module.exports = authorizeUser;
